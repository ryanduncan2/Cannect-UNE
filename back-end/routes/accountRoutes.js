import express from 'express';
const accountRouter = express.Router();

import { authoriseAccess, authoriseSiteAdmin } from '../middleware/authMiddleware.js';
import 
{ 
    register, 
    login, 
    refresh, 
    deleteAccount, 
    updateAccount, 
    getAccount, 
    deleteOtherAccount,
    updateOtherAccount,
    getOtherAccount,
    getAllAccounts,
    elevateAdmin,
    removeAdmin
} from '../controllers/accountController.js';

// Register a new account + Automatically login.
accountRouter.post('/register', function (req, res) { register(req, res) });

// Logs into an existing account
accountRouter.post('/login', function (req, res) { login(req, res) });

// Refreshes an access token with an existing refresh token.
accountRouter.post('/refresh', function (req, res) { refresh(req, res) });

// Deletes an existing account.
accountRouter.delete('/delete', authoriseAccess, function (req, res) { deleteAccount(req, res) });

// Updates account information.
accountRouter.post('/update', authoriseAccess, function (req, res) { updateAccount(req, res) });

// Gets account information.
accountRouter.get('/get', authoriseAccess, function (req, res) { getAccount(req, res) });

// Gets account information.
accountRouter.get('/getOther', function (req, res) { getOtherAccount(req, res) });

// ======== ADMIN ENDPOINTS ========

// Deletes an existing account.
accountRouter.delete('/deleteOther', authoriseSiteAdmin, function (req, res) { deleteOtherAccount(req, res) });

// Updates account information.
accountRouter.post('/updateOther', authoriseSiteAdmin, function (req, res) { updateOtherAccount(req, res) });

// Gets account information.
accountRouter.get('/getAll', authoriseSiteAdmin, function (req, res) { getAllAccounts(req, res) });

// Gets account information.
accountRouter.post('/elevateAdmin', authoriseSiteAdmin, function (req, res) { elevateAdmin(req, res) });

// Gets account information.
accountRouter.post('/removeAdmin', authoriseSiteAdmin, function (req, res) { removeAdmin(req, res) });

export { accountRouter };