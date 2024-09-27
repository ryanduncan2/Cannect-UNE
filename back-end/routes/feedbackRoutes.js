import express from 'express';
const feedbackRouter = express.Router();

import { authoriseAccess, authoriseSiteAdmin } from '../middleware/authMiddleware.js'
import { createFeedback, deleteFeedback, getFeedback, deleteOtherFeedback, getOtherFeedback, getAllFeedback } from '../controllers/feedbackController.js';

// Creates new feedback.
feedbackRouter.post('/create', authoriseAccess, function (req, res) { createFeedback(req, res) });

// Deletes feedback.
feedbackRouter.delete('/delete', authoriseAccess, function (req, res) { deleteFeedback(req, res) });

// Get User Feedback
feedbackRouter.get('/get', authoriseAccess, function (req, res) { getFeedback(req, res) });

// ======== ADMIN ENDPOINTS ========

feedbackRouter.delete('/deleteOther', authoriseSiteAdmin, function (req, res) { deleteOtherFeedback(req, res) });

// Get User Feedback
feedbackRouter.get('/getOther', authoriseSiteAdmin, function (req, res) { getOtherFeedback(req, res) });

feedbackRouter.get('/getAll', authoriseSiteAdmin, function (req, res) { getAllFeedback(req, res) });

export { feedbackRouter };