import { Account } from '../models/Account.js';
import { Administrator } from '../models/Administrator.js';
import { Clinic } from '../models/Clinic.js';
import { Review } from '../models/Review.js';
import { nanoid } from 'nanoid';
import { createResponse } from '../util.js'

async function createClinic(req, res)
{
    const { name, 
        website, 
        email, 
        phone, 
        telehealth,
        concession_pricing,
        pharmacy_choice, 
        referral_required, 
        initial_consultation_fee, 
        consultation_fee } = req.body;

    if (name === undefined || 
        pharmacy_choice === undefined || 
        referral_required === undefined || 
        initial_consultation_fee === undefined || 
        consultation_fee === undefined || 
        telehealth === undefined ||
        concession_pricing === undefined)
    {
        res.status(400).json(createResponse(0, 'Fields missing from clinic creation request.'));
        return;
    }

    const public_id = nanoid();
    await Clinic.create({ public_id, name, website, email, phone, pharmacy_choice, referral_required, telehealth, concession_pricing, initial_consultation_fee, consultation_fee });

    res.sendStatus(200);
}

async function deleteClinic(req, res)
{
    const publicID = req.query.id;

    if (!publicID)
    {
        res.status(400).json(createResponse(0, 'No ID provided for clinic.'));
        return;
    }

    var clinic = await Clinic.findOne({ public_id: publicID });

    if (!clinic)
    {
        res.status(400).json(createResponse(1, 'Unable to find clinic.'));
        return;
    }

    await Clinic.deleteOne({ public_id: publicID });

    res.sendStatus(200);
}

async function updateClinic(req, res)
{
    const clinicID = req.body.clinic_id;
    const name = req.body.name;
    const website = req.body.website;
    const email = req.body.email;
    const phone = req.body.phone;
    const telehealth = req.body.telehealth;
    const concessionPricing = req.body.concession_pricing;
    const pharmacyChoice = req.body.pharmacy_choice;
    const referralRequired = req.body.referral_required;
    const initialConsultationFee = req.body.initial_consultation_fee;
    const consultationFee = req.body.consultation_fee;

    // Sanity Checks

    if (clinicID === undefined)
    {
        res.status(400).json(createResponse(0, 'No ID provided for clinic.'));
        return;
    }

    const clinic = await Clinic.findOne({ public_id: clinicID });

    if (!clinic)
    {
        res.status(400).json(createResponse(1, 'Provided clinic does not exist.'));
    }

    // Query Construction

    var updateParams = { };

    if (name != undefined)
    {
        updateParams['name'] = name;
    }

    if (website != undefined)
    {
        updateParams['website'] = website;
    }

    if (email != undefined)
    {
        updateParams['email'] = email;
    }

    if (phone != undefined)
    {
        updateParams['phone'] = phone;
    }

    if (telehealth != undefined)
    {
        updateParams['telehealth'] = telehealth;
    }

    if (concessionPricing != undefined)
    {
        updateParams['concession_pricing'] = concessionPricing;
    }

    if (pharmacyChoice != undefined)
    {
        updateParams['pharmacy_choice'] = pharmacyChoice;
    }

    if (referralRequired != undefined)
    {
        updateParams['referral_required'] = referralRequired;
    }

    if (initialConsultationFee != undefined)
    {
        updateParams['initial_consultation_fee'] = initialConsultationFee;
    }

    if (consultationFee != undefined)
    {
        updateParams['consultation_fee'] = consultationFee;
    }

    // Sending Update

    await Clinic.updateOne({ public_id: clinicID }, { $set: updateParams });

    res.sendStatus(200);
}

async function getClinic(req, res)
{
    const publicID = req.query.id;

    if (!publicID)
    {
        res.status(400).json(createResponse(0, 'No ID provided for clinic.'));

        return;
    }

    var results = await Clinic.aggregate([
        {
            $match: { public_id: publicID }
        },
        {
            $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'clinic',
            as: 'reviews'
            }
        },
        {
            $addFields: {
            ratings: {
                $map: {
                input: [0, 1, 2, 3, 4, 5],
                as: "ratingValue",
                in: {
                    $size: {
                    $filter: {
                        input: "$reviews",
                        as: "review",
                        cond: { $eq: ["$$review.rating", "$$ratingValue"] }
                    }
                    }
                }
                }
            },
            total_ratings: { $size: "$reviews" },
            average_rating: { $avg: "$reviews.rating" }
            }
        },
        {
            $project: {
            _id: 0,
            public_id: 1,
            name: 1,
            website: 1,
            email: 1,
            phone: 1,
            telehealth: 1,
            initial_consultation_fee: 1,
            consultation_fee: 1,
            referral_required: 1,
            concession_pricing: 1,
            pharmacy_choice: 1,
            ratings: 1,
            average_rating: 1,
            total_ratings: 1
            }
        }
    ]);

    if (results.length >= 1)
    {
        res.status(200).json(results[0]);
    }
    else
    {
        res.status(400).json(createResponse(1, 'Unable to find clinic.'));
    }
}

// TODO: Sanitise inputs and ensure type compliance.
async function searchClinics(req, res)
{
    var query = { };

    // Clinic Name

    if (req.query.name != undefined)
    {
        query['name'] = { $regex: req.query.name, $options: 'i'};
    }

    // Pharmacy Choice

    if (req.query.pharmacy_choice != undefined)
    {
        query['pharmacy_choice'] = req.query.pharmacy_choice;
    }

    // Referral Required

    if (req.query.referral_required != undefined)
    {
        query['referral_required'] = req.query.referral_required;
    }

    // Telehealth Provided

    if (req.query.telehealth != undefined)
    {
        query['telehealth'] = req.query.telehealth;
    }

    // Concession Pricing Available

    if (req.query.concession_pricing != undefined)
    {
        query['concession_pricing'] = req.query.concession_pricing;
    }

    // Initial Consultation Fee

    var initConsultFeeQuery = { };

    if (req.query.init_consult_fee_min != undefined)
    {
        initConsultFeeQuery['$gt'] = req.query.init_consult_fee_min;
    }

    if (req.query.init_consult_fee_max != undefined)
    {
        initConsultFeeQuery['$lt'] = req.query.init_consult_fee_max;
    }

    if (Object.keys(initConsultFeeQuery).length != 0)
    {
        query['initial_consultation_fee'] = initConsultFeeQuery;
    }

    // Consultation Fee

    var consultFeeQuery = { };

    if (req.query.consult_fee_min != undefined)
    {
        consultFeeQuery['$gt'] = req.query.consult_fee_min;
    }

    if (req.query.consult_fee_max != undefined)
    {
        consultFeeQuery['$lt'] = req.query.consult_fee_max;
    }

    if (Object.keys(consultFeeQuery).length != 0)
    {
        query['consultation_fee'] = consultFeeQuery;
    }

    // Database Query

    var results = await Clinic.aggregate([
        {
          $match: query 
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'clinic',
            as: 'reviews'
          }
        },
        {
          $addFields: {
            ratings: {
              $map: {
                input: [0, 1, 2, 3, 4, 5], 
                as: "ratingValue",
                in: {
                  $size: {
                    $filter: {
                      input: "$reviews",
                      as: "review",
                      cond: { $eq: ["$$review.rating", "$$ratingValue"] }
                    }
                  }
                }
              }
            },
            total_ratings: {
              $size: "$reviews"
            },
            average_rating: {
              $avg: "$reviews.rating" 
            }
          }
        },
        {
          $project: {
            _id: 0,
            public_id: 1,
            name: 1,
            website: 1,
            initial_consultation_fee: 1,
            consultation_fee: 1,
            referral_required: 1,
            concession_pricing: 1,
            pharmacy_choice: 1,
            ratings: 1,
            average_rating: 1,
            total_ratings: 1
          }
        }
      ]);

    res.status(200).json(results);
}

async function elevateClinicAdmin(req, res)
{
    const clinicID = req.body.clinic_id;
    const accountID = req.body.account_id;

    const adminAccount = await Account.findOne({ public_id: accountID });

    if (!adminAccount)
    {
        res.status(400).json(createResponse(0, 'Unable to find account.'));
        return;
    }

    const clinicToAdministrate = await Clinic.findOne({ public_id: clinicID });

    if (!clinicToAdministrate)
    {
        res.status(400).json(createResponse(1, 'Unable to find clinic.'));
        return;
    }

    const duplicate = await Administrator.findOne({ account: adminAccount._id, clinic: clinicToAdministrate._id });

    if (duplicate)
    {
        res.status(400).json(createResponse(2, 'Provided user is already an administrator for the clinic.'));
        return;
    }

    await Administrator.create({ account: adminAccount._id, clinic: clinicToAdministrate._id });

    res.sendStatus(200);
}

async function deleteClinicAdmin(req, res)
{
    const clinicID = req.query.clinic_id;
    const accountID = req.query.admin_id;

    const adminAccount = await Account.findOne({ public_id: accountID });

    if (!adminAccount)
    {
        res.status(400).json(createResponse(0, 'Unable to find account.'));
        return;
    }

    const clinic = await Clinic.findOne({ public_id: clinicID });

    if (!clinic)
    {
        res.status(400).json(createResponse(1, 'Unable to find clinic.'));
        return;
    }

    const record = await Administrator.findOne({ account: adminAccount._id, clinic: clinic._id });

    if (!record)
    {
        res.status(400).json(createResponse(2, 'Provided account is not an administrator of the clinic.'));
        return;
    }

    await Administrator.deleteOne({ account: adminAccount._id, clinic: clinic._id });

    res.sendStatus(200);
}

async function getReviews(req, res)
{
    const clinicID = req.query.clinic_id;
    const count = req.query.count;
    const offset = req.query.offset;
    const sortMode = req.query.sort_mode;

    // Sanity Checks

    if (!clinicID || !count || !offset)
    {
        res.status(400).json(createResponse(0, 'Missing fields in request.'));
        return;
    }

    const clinic = await Clinic.findOne({ public_id: clinicID });

    if (!clinic)
    {
        res.status(400).json(createResponse(1, 'Clinic does not exist.'));
        return;
    }

    // Database Query

    // 0 = newest -> oldest date (default)
    // 1 = oldest -> newest
    // 2 = highest -> lowest rating
    // 3 = lowest -> highest rating
    var sortParam;

    switch (sortMode)
    {
        case '0': sortParam = { date_submitted: -1 }; break;
        case '1': sortParam = { date_submitted: 1 }; break;
        case '2': sortParam = { rating: -1 }; break;
        case '3': sortParam = { rating: 1 }; break;
        default: sortParam = { date_submitted: -1 }; break;
    }

    const reviews = await Review.aggregate([
        {
            $match: { clinic: clinic._id }
        },
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
            $lookup:
            {
                from: 'accounts',
                localField: 'account',
                foreignField: '_id',
                as: 'account'
            }
        },
        {
            $unwind: '$account'
        },
        {
            $addFields:
            {
                account_id:  '$account.public_id'
            }
        },
        {
            $project:
            {
                _id: 0,
                public_id: 1,
                account_id: 1,
                text: 1,
                rating: 1,
                date_submitted: 1
            }
        }
    ]);

    res.status(200).json(reviews);
}

export { createClinic, deleteClinic, updateClinic, getClinic, searchClinics, elevateClinicAdmin, deleteClinicAdmin, getReviews };