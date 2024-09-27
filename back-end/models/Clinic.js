import mongoose from 'mongoose';

import { Administrator } from './Administrator.js';

const clinicSchema = new mongoose.Schema(
{
    public_id:
    {
        type: String,
        require: true,
        unique: true
    },
    name: 
    {
        type: String,
        require: true
    },
    website:
    {
        type: String,
        require: true
    },
    email:
    {
        type: String
    },
    phone:
    {
        type: String
    },
    pharmacy_choice:
    {
        type: Boolean,
        require: true
    },
    referral_required:
    {
        type: Boolean,
        require: true
    },
    telehealth:
    {
        type: Boolean,
        require: true
    },
    concession_pricing:
    {
        type: Boolean,
        require: true
    },
    initial_consultation_fee:
    {
        type: Number,
        require: true
    },
    consultation_fee:
    {
        type: Number,
        require: true
    }
}, { collection: 'clinics' });

clinicSchema.pre('remove', function(next) 
{
    Administrator.deleteMany({ clinic: this._id});
});

const Clinic = mongoose.model('Clinic', clinicSchema);

export { Clinic };