import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const administratorSchema = new mongoose.Schema(
{
    account: 
    {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        require: true
    },
    clinic:
    {
        type: Schema.Types.ObjectId,
        ref: 'Clinic',
        require: true
    }
}, { collection: 'administrators' });

// Defines a composite surrogate key, including the account and clinic.
administratorSchema.index({ account: 1, clinic: 1}, { unique: true });

const Administrator = mongoose.model('Administrator', administratorSchema);

export { Administrator };