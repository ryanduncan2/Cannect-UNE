import { createResponse } from '../util.js'
import { nanoid } from 'nanoid';
import { Review } from '../models/Review.js';
import { Account } from '../models/Account.js';
import { Clinic } from '../models/Clinic.js';

async function createReview(req, res)
{
    const { clinic_id, text, rating } = req.body;
    const thisAccountID = req.thisAccountID;

    // Sanity Checks

    if (clinic_id === undefined ||
        text === undefined ||
        rating === undefined)
    {
        res.status(400).json(createResponse(0, 'Fields missing from review creation request.'));
        return;
    }

    if (isNaN(rating) || 
        parseInt(Number(rating)) != rating || 
        isNaN(parseInt(rating, 10)) ||
        rating < 0 ||
        rating > 5)
    {
        res.status(400).json(createResponse(1, 'Rating must be an integer between 0 and 5 (inclusive).'));
        return;
    }

    const account = await Account.findOne({ public_id: thisAccountID });

    if (!account)
    {
        res.sendStatus(500);
        return;
    }

    const clinic = await Clinic.findOne({ public_id: clinic_id });

    if (!clinic)
    {
        res.status(400).json(createResponse(1, 'Unable to find clinic.'));
        return;
    }

    // Duplicate Check

    const duplicate = await Review.findOne({ account: account._id, clinic: clinic._id });

    if (duplicate)
    {
        res.status(400).json(createResponse(2, 'A review for this clinic by this account already exists.'));
        return;
    }

    // Review Creation

    const publicID = nanoid();
    const today = Date();

    await Review.create({ public_id: publicID, account: account._id, clinic: clinic._id, text, rating, date_submitted: today });
    res.sendStatus(200);
}

async function deleteReview(req, res)
{
    const publicID = req.query.reviewID;
    const thisAccountID = req.thisAccountID;

    // Sanity Checks

    const review = await Review.findOne({ public_id: publicID });

    if (!review)
    {
        res.status(400).json(createResponse(0, 'Provided review does not exist.'));
        return;
    }

    const account = await Account.findOne({ public_id: thisAccountID });

    if (!account)
    {
        res.sendStatus(500);
        return;
    }

    if (review.account.toString() !== account._id.toString())
    {
        res.status(400).json(createResponse(1, 'This account does not own the provided review.'));
        return;
    }

    // Delete Review

    await Review.deleteOne({ _id: review._id });
    res.sendStatus(200);
}

async function updateReview(req, res)
{
    const { publicID, newText, newRating } = req.body;
    const thisAccountID = req.thisAccountID;

    // Sanity Checks

    if (!publicID || (!newText && newRating == undefined))
    {
        res.status(400).json(createResponse(0, 'Missing parameters from request.'));
    }

    if (newRating != undefined)
    {
        if (isNaN(newRating) || 
        parseInt(Number(newRating)) != newRating || 
        isNaN(parseInt(newRating, 10)) ||
        newRating < 0 ||
        newRating > 5)
        {
            res.status(400).json(createResponse(1, 'Rating must be an integer between 0 and 5 (inclusive).'));
            return;
        }
    }

    const review = await Review.findOne({ public_id: publicID });

    if (!review)
    {
        res.status(400).json(createResponse(2, 'Provided review does not exist.'));
        return;
    }

    const account = await Account.findOne({ public_id: thisAccountID });

    if (!account)
    {
        res.sendStatus(500);
        return;
    }

    if (review.account.toString() !== account._id.toString())
    {
        res.status(400).json(createResponse(3, 'This account does not own the provided review.'));
        return;
    }

    // Update Review

    const today = Date();
    var updateObj = { date_submitted: today };

    if (newText != undefined)
    {
        updateObj['text'] = newText;
    }

    if (newRating != undefined)
    {
        updateObj['rating'] = newRating;
    }

    await Review.updateOne({ public_id: publicID }, { $set: updateObj });

    res.sendStatus(200);
}

async function deleteOtherReview(req, res)
{
    const publicID = req.query.reviewID;

    // Sanity Checks

    const review = await Review.findOne({ public_id: publicID });

    if (!review)
    {
        res.status(400).json(createResponse(0, 'Provided review does not exist.'));
        return;
    }

    // Delete Review

    await Review.deleteOne({ _id: review._id });
    res.sendStatus(200);
}

export { createReview, deleteReview, updateReview, deleteOtherReview };