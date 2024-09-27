import express from 'express';
const clinicRouter = express.Router();

import { authoriseAccess, authoriseClinicAdmin, authoriseSiteAdmin } from '../middleware/authMiddleware.js';
import { createClinic, deleteClinic, updateClinic, getClinic, searchClinics, elevateClinicAdmin, deleteClinicAdmin, getReviews } from '../controllers/clinicController.js';

// Creates a new clinic.
clinicRouter.post('/create', authoriseSiteAdmin, function (req, res) { createClinic(req, res) });

// Gets clinic information.
clinicRouter.get('/get', authoriseAccess, function (req, res) { getClinic(req, res) });

// Searches clinics based on given parameters.
clinicRouter.get('/search', function (req, res) { searchClinics(req, res) });

// Updates clinic information.
clinicRouter.post('/update', authoriseClinicAdmin, function (req, res) { updateClinic(req, res) });

// Deletes a clinic.
clinicRouter.delete('/delete', authoriseSiteAdmin, function(req, res) { deleteClinic(req, res) });

// Adds an account to the clinic admins list.
clinicRouter.post('/admin/elevate', authoriseClinicAdmin, function (req, res) { elevateClinicAdmin(req, res) });

// Removes an account from the clinic admins list.
clinicRouter.delete('/admin/delete', authoriseClinicAdmin, function (req, res) { deleteClinicAdmin(req, res) });

clinicRouter.get('/reviews', authoriseAccess, function (req, res) { getReviews(req, res) });

export { clinicRouter };