import { Account } from '../models/Account.js';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createResponse } from '../util.js'
import bcrypt from 'bcryptjs';

dotenv.config();

function createToken(payload, expiry, secret)
{
    return jwt.sign({ payload }, secret, { expiresIn: expiry});
}

async function register(req, res)
{
    const { username, password, email } = req.body;

    // Sanity Checks

    if (username === undefined)
    {
        res.status(400).json(createResponse(0, 'No username provided.'));
        return;
    }

    if (password === undefined)
    {
        res.status(400).json(createResponse(1, 'No password provided.'));
        return;
    }

    if (email === undefined)
    {
        res.status(400).json(createResponse(2, 'No email provided.'));
        return;
    }

    var account = await Account.findOne({ username: username });

    if (account)
    {
        res.status(400).json(createResponse(3, 'An account with this username already exists.'));
        return;
    }

    account = await Account.findOne({ email: email });

    if (account)
    {
        res.status(400).json(createResponse(3, 'An account with this email already exists.'));
        return;
    }

    // Creating Account

    const publicID = nanoid();
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    account = await Account.create({ public_id: publicID, username, email, password: passwordHash, permission_level: 0 });

    if (!account)
    {
        res.sendStatus(500);
    }

    // Creating JWTs

    const accessToken = createToken(account.public_id, process.env.ACCESS_TOKEN_EXPIRY | 0, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = createToken(account.public_id, process.env.REFRESH_TOKEN_EXPIRY | 0, process.env.REFRESH_TOKEN_SECRET);

    res.status(200).json({ access: accessToken, refresh: refreshToken });
}

async function login(req, res)
{
    const { username, password } = req.body;

    // Sanity Checks

    if (!username)
    {
        res.status(400).json(createResponse(0, 'No username provided.'));
        return;
    }

    if (!password)
    {
        res.status(400).json(createResponse(1, 'No password provided.'));
        return;
    }

    const account = await Account.findOne({ username });

    if (!account)
    {
        res.status(400).json(createResponse(2, 'Account does not exist.'));
        return;
    }

    // Verifying Credentials

    const auth = await bcrypt.compare(password, account.password);

    if (!auth)
    {
        res.status(400).json(createResponse(3, 'Incorrect password provided.'));
        return;
    }

    // Creating JWTs

    const accessToken = createToken(account.public_id, process.env.ACCESS_TOKEN_EXPIRY | 0, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = createToken(account.public_id, process.env.REFRESH_TOKEN_EXPIRY | 0, process.env.REFRESH_TOKEN_SECRET);

    res.status(200).json({ access: accessToken, refresh: refreshToken });
}

async function refresh(req, res)
{
    const { refresh } = req.body;

    if (!refresh)
    {
        res.status(400).json(createResponse(1, 'No refresh token supplied.'));
        return;
    }

    jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET, async (error, decodedToken) =>
    {
        if (error)
        {
            console.log(error.message);
            res.status(400).json(createResponse(0, 'Invalid refresh token supplied.'));
            return;
        }

        // Creating New Access Token 
        
        var userID = JSON.parse(JSON.parse(JSON.stringify(Buffer.from(refresh.split('.')[1], 'base64').toString())))['payload'];
        const accessToken = createToken(userID, process.env.ACCESS_TOKEN_EXPIRY | 0, process.env.ACCESS_TOKEN_SECRET);

        res.status(200).json({ access: accessToken });
    });
}

async function deleteAccount(req, res)
{
    const thisAccountID = req.thisAccountID;

    var account = await Account.findOne({ public_id: thisAccountID });

    if (!account)
    {
        res.sendStatus(500);
        return;
    }

    await Account.deleteOne({ public_id: thisAccountID });

    res.sendStatus(200);
}

async function updateAccount(req, res)
{
    const { new_username, new_password, new_email, old_password } = req.body;
    const thisAccountID = req.thisAccountID;

    // Sanity Checks

    if (!old_password)
    {
        res.status(400).json(createResponse(0, 'Password not provided.'));
        return;
    }

    const account = await Account.findOne({ public_id: thisAccountID });

    if (!account)
    {
        res.sendStatus(500);
        return;
    }

    // Updating Account

    const auth = await bcrypt.compare(old_password, account.password);

    if (!auth)
    {
        res.status(400).json(createResponse(1, "Password was incorrect."));
        return;
    }

    if (new_username)
    {
        await Account.updateOne({ public_id: thisAccountID }, { $set: { username: new_username } });
    }

    if (new_email)
    {
        await Account.updateOne({ public_id: thisAccountID }, { $set: { email: new_email } });
    }

    if (new_password)
    {
        const salt = await bcrypt.genSalt();
        var password_final = await bcrypt.hash(new_password, salt);

        await Account.updateOne({ public_id: thisAccountID }, { $set: { password: password_final } });
    }

    res.sendStatus(200);
}

async function getAccount(req, res)
{
    const thisAccountID = req.thisAccountID;

    if (!thisAccountID)
    {
        res.sendStatus(500);
        return;
    }

    const account = await Account.findOne({ public_id: thisAccountID }, { _id: 0, public_id: 1, username: 1, permission_level: 1 });

    res.status(200).json(account);
}

// ======== ADMIN ENDPOINTS ========

async function deleteOtherAccount(req, res)
{
    const accountID = req.body.account_id;

    var account = await Account.findOne({ public_id: accountID });

    if (!account)
    {
        res.status(400).json(createResponse(0, 'This account does not exist.'));
        return;
    }

    await Account.deleteOne({ public_id: accountID });

    res.sendStatus(200);
}

async function updateOtherAccount(req, res)
{
    const newUsername = req.body.new_username;
    const newPassword = req.body.new_password;
    const newEmail = req.body.new_email;
    const publicID = req.body.account_id;

    const account = await Account.findOne({ public_id: publicID });

    if (!account)
    {
        res.status(400).json(createResponse(0, 'Unable to find account.'));
        return;
    }

    if (newUsername)
    {
        await Account.updateOne({ public_id: publicID }, { $set: { username: newUsername } });   
    }

    if (newEmail)
    {
        await Account.updateOne({ public_id: publicID }, { $set: { email: newEmail } });   
    }

    if (newPassword)
    {
        const salt = await bcrypt.genSalt();
        var password_final = await bcrypt.hash(newPassword, salt);

        await Account.updateOne({ public_id: publicID }, { $set: { password: password_final } });
    }

    res.sendStatus(200);
}

async function getOtherAccount(req, res)
{
    const username = req.query.username;
    const accountID = req.query.account_id;

    if (username)
    {
        const account = await Account.findOne({ username }, { _id: 0, public_id: 1, username: 1, email: 1, permission_level: 1 });

        if (!account)
        {
            res.status(400).json(createResponse(0, 'Account with provided username does not exist.'));
            return;
        }

        res.status(200).json(account);
        return;
    }

    if (accountID)
    {
        const account = await Account.findOne({ public_id: accountID }, { _id: 0, public_id: 1, username: 1, email: 1, permission_level: 1 });

        if (!account)
        {
            res.status(400).json(createResponse(1, 'Account with provided ID does not exist.'));
            return;
        }

        res.status(200).json(account);
        return;
    }

    res.status(400).json(createResponse(0, 'Username or public ID must be provided.'));
}

async function getAllAccounts(req, res)
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
        case '0': sortParam = { username: 1 }; break;
        case '1': sortParam = { username: -1 }; break;
        default: sortParam = { username: 1 }; break;
    }

    const accounts = await Account.aggregate([
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
                username: 1,
                email: 1
            }
        }
    ]);

    res.status(200).json(accounts);
}

async function elevateAdmin(req, res)
{
    const accountID = req.body.account_id;

    // Sanity Checks

    if (accountID === undefined)
    {
        res.status(400).json(createResponse(0, 'Missing fields in request.'));
        return;
    }

    const account = await Account.findOne({ public_id: accountID });

    if (!account)
    {
        res.status(400).json(createResponse(1, 'Unable to find account.'));
        return;
    }

    // Updating Account

    await Account.updateOne({ public_id: accountID }, { $set: { permission_level: 1 } });

    res.sendStatus(200);
}

async function removeAdmin(req, res)
{
    const accountID = req.body.account_id;

    // Sanity Checks

    if (accountID === undefined)
    {
        res.status(400).json(createResponse(0, 'Missing fields in request.'));
        return;
    }

    const account = await Account.findOne({ public_id: accountID });

    if (!account)
    {
        res.status(400).json(createResponse(1, 'Unable to find account.'));
        return;
    }

    // Updating Account

    await Account.updateOne({ public_id: accountID }, { $set: { permission_level: 0 } });

    res.sendStatus(200);
}

export { register, login, refresh, deleteAccount, updateAccount, getAccount, deleteOtherAccount, updateOtherAccount, getOtherAccount, getAllAccounts, elevateAdmin, removeAdmin };