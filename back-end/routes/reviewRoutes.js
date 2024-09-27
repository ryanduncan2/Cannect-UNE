import express from 'express';
const reviewRouter = express.Router();

import { authoriseAccess, authoriseSiteAdmin } from '../middleware/authMiddleware.js'
import { createReview, deleteReview, updateReview, deleteOtherReview } from '../controllers/reviewController.js';

// Adds a review to a clinic.
reviewRouter.post('/create', authoriseAccess, function (req, res) { createReview(req, res) });

// Deletes a review.
reviewRouter.delete('/delete', authoriseAccess, function (req, res) { deleteReview(req, res) });

// Updates a review.
reviewRouter.post('/update', authoriseAccess, function (req, res) { updateReview(req, res) });

// ======== ADMIN ENDPOINTS ========

reviewRouter.delete('/deleteOther', authoriseSiteAdmin, function (req, res) { deleteOtherReview(req, res) });

export { reviewRouter };