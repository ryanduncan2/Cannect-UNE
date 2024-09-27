import { createResponse } from '../util.js'
import { nanoid } from 'nanoid';
import { Feedback } from '../models/Feedback.js';
import { Account } from '../models/Account.js';
import { Clinic } from '../models/Clinic.js';

async function createFeedback(req, res)
{
    const { text } = req.body;
    const thisAccountID = req.thisAccountID;

    // Sanity Checks

    if (!thisAccountID)
    {
        res.sendStatus(500);
        return;
    }

    if (text === undefined)
    {
        res.status(400).json(createResponse(0, 'Fields missing from review creation request.'));
        return;
    }

    const account = await Account.findOne({ public_id: thisAccountID });

    if (!account)
    {
        res.status(500).json(createResponse(1, 'Unable to find account.'));
        return;
    }

    // Feedback Creation

    const publicID = nanoid();
    const today = Date();

    await Feedback.create({ public_id: publicID, account: account._id, text, date_submitted: today });

    res.sendStatus(200);
}

async function deleteFeedback(req, res)
{
    const thisAccountID = req.thisAccountID;
    const feedbackID = req.query.feedback_id;

    const account = await Account.findOne({ public_id: thisAccountID });
    const feedback = await Feedback.findOne({ public_id: feedbackID });

    // Sanity Checks

    if (!account)
    {
        res.sendStatus(500);
        return;
    }

    if (!feedback)
    {
        res.status(400).json(createResponse(0, 'Feedback with this ID does not exist.'));
        return;
    }

    // Deleting Feedback

    await feedback.deleteOne({ _id: feedback._id });
    res.sendStatus(200);
}

async function getFeedback(req, res)
{
    const thisAccountID = req.thisAccountID;
    const account = await Account.findOne({ public_id: thisAccountID });

    // Sanity Checks

    if (!account)
    {
        res.sendStatus(500);
        return;
    }

    // Querying Database

    var results = await Feedback.find({ account: account._id }, { '_id': 0, 'public_id': 1, 'text': 1, 'date_submitted': 1 });
    res.status(200).json(results);
}

// ======== ADMIN ENDPOINTS ========

async function deleteOtherFeedback(req, res)
{
    const feedbackID = req.query.feedback_id;
    const feedback = await Feedback.findOne({ public_id: feedbackID });

    if (!feedback)
    {
        res.status(400).json(createResponse(0, 'Feedback with this ID does not exist.'));
        return;
    }

    await feedback.deleteOne({ public_id: feedbackID });

    res.sendStatus(200);
}

async function getOtherFeedback(req, res)
{
    const accountID = req.query.account;
    const account = await Account.findOne({ public_id: accountID });

    // Sanity Checks

    if (!account)
    {
        res.status(400).json(createResponse(0, 'Account does not exist.'));
        return;
    }

    // Querying Database

    var results = await Feedback.find({ account: account._id }, { '_id': 0, 'public_id': 1, 'text': 1 });
    res.status(200).json(results);
}

async function getAllFeedback(req, res)
{
    const count = req.query.count;
    const offset = req.query.offset;
    const sortMode = req.query.sort_mode;

    // Sanity Checks

    if (!count || !offset)
    {
        res.status(400).json(createResponse(0, 'Missing fields in request.'));
        return;
    }

    // Database Query

    var sortParam;

    switch (sortMode)
    {
        case '0': sortParam = { date_submitted: -1 }; break;
        case '1': sortParam = { date_submitted: 1 }; break;
        default: sortParam = { date_submitted: -1 }; break;
    }

    const feedback = await Feedback.aggregate([
        {
            $sort: sortParam
        },
        {
            $limit: Number(offset) + Number(count)
        },
        {
            $skip: Number(offset)
        },
        {
            $project:
            {
                _id: 0,
                public_id: 1,
                text: 1,
                date_submitted: 1
            }
        }
    ]);

    res.status(200).json(feedback);
}

export { createFeedback, deleteFeedback, getFeedback, deleteOtherFeedback, getOtherFeedback, getAllFeedback };