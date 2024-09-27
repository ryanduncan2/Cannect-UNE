import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routing

import { accountRouter } from './routes/accountRoutes.js';
app.use('/api/account', accountRouter);

import { clinicRouter } from './routes/clinicRoutes.js';
app.use('/api/clinic', clinicRouter);

import { reviewRouter } from './routes/reviewRoutes.js';
app.use('/api/review', reviewRouter);

import { feedbackRouter } from './routes/feedbackRoutes.js';
app.use('/api/feedback', feedbackRouter);

// Database

const dbURI = 'mongodb+srv://admin:PZc47YxTe9enfvJI@cannecttesting.rqkgh.mongodb.net/'
mongoose.connect(dbURI);

// Initialisation

app.listen(8081, () =>
{
    console.log('Listening on Port 4560');
});