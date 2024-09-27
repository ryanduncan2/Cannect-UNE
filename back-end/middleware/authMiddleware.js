import jwt from 'jsonwebtoken';
import { Account } from '../models/Account.js';
import { Clinic } from '../models/Clinic.js';
import { Administrator } from '../models/Administrator.js';
import { createResponse } from '../util.js';

async function verifyUser(req)
{
    const authHeader = req.headers.authorization;

    if (!authHeader)
    {
        return createResponse(1, 'Authorisation header is missing from the request.');
    }

    var payload = authHeader.split(/\s+/);

    if (payload.length != 2 || payload[0] != 'Bearer')
    {
        return createResponse(2, 'Authorisation header is malformed, correct form is \'Bearer [JWT]\'.');
    }

    var accessToken = payload[1];
    
    var flag = true;
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) =>
    {
        if (err)
        {
            flag = false;
        }
    });

    if (!flag)
    {
        return createResponse(3, 'Provided JWT is either expired or invalid.');
    }

    var userID = JSON.parse(JSON.parse(JSON.stringify(Buffer.from(accessToken.split('.')[1], 'base64').toString())))['payload'];
    req.thisAccountID = userID;
    
    return createResponse(0);
}

async function verifyClinicAdmin(req)
{
    const { clinicID } = req.body;
    var accessToken = req.headers.authorization.split(/\s+/)[1];
    var userID = JSON.parse(JSON.parse(JSON.stringify(Buffer.from(accessToken.split('.')[1], 'base64').toString())))['payload'];

    var user = await Account.findOne({ public_id: userID });
    var clinic = await Clinic.findOne({ public_id: clinicID });

    if (!user)
    {
        return createResponse(1, 'Provided user does not exist.');
    }

    if (!clinic)
    {
        return createResponse(2, 'Provided clinic does not exist.');
    }

    var admin = await Administrator.findOne({ account: user._id, clinic: clinic._id });

    if (!admin)
    {
        return createResponse(3, 'User is not an administrator of the provided clinic.');
    }

    return createResponse(0);
}

async function verifySiteAdmin(req)
{
    var accessToken = req.headers.authorization.split(/\s+/)[1];
    var userID = JSON.parse(JSON.parse(JSON.stringify(Buffer.from(accessToken.split('.')[1], 'base64').toString())))['payload'];

    const account = await Account.findOne({ public_id: userID });

    if (account.permission_level != 1)
    {
        return createResponse(1, 'User is not a site administrator.');
    }

    return createResponse(0);
}

const authoriseAccess = async (req, res, next) =>
{
    var response = await verifyUser(req);

    if (response.code == 0)
    {
        next();
        return;
    }

    res.status(401).json(response);
}

const authoriseClinicAdmin = async (req, res, next) =>
{
    var out = await verifyUser(req);

    if (out.code != 0)
    {
        res.status(401).json(out);
        return;
    }

    out = await verifySiteAdmin(req);

    if (out.code == 0)
    {
        next();
        return;
    }

    out = await verifyClinicAdmin(req);

    if (out.code == 0)
    {
        next();
        return;
    }

    res.status(403).json(out);
}

const authoriseSiteAdmin = async (req, res, next) =>
{
    var out = await verifyUser(req);

    if (out.code != 0)
    {
        res.status(401).json(out);
        return;
    }

    out = await verifySiteAdmin(req);

    if (out.code == 0)
    {
        next();
        return;
    }

    res.status(403).json(out);
}

const authorisePersonal = async (req, res, next) =>
{
    var out = await verifyUser(req);

    if (out.code != 0)
    {
        res.status(401).json(out);
        return;
    }

    out = await verifySiteAdmin(req);

    if (out.code == 0)
    {
        next();
        return;
    }

    var accountID = req.body.account_id == undefined ? req.query.account_id : req.body.account_id;
    var accessToken = req.headers.authorization.split(/\s+/)[1];
    var userID = JSON.parse(JSON.parse(JSON.stringify(Buffer.from(accessToken.split('.')[1], 'base64').toString())))['payload'];

    if (accountID != userID)
    {
        res.status(403).json(createResponse(4, 'Insufficient permissions.'));
        return;
    }

    next();
}

export { authoriseAccess, authoriseClinicAdmin, authoriseSiteAdmin, authorisePersonal };