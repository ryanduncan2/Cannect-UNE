import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
{
    public_id:
    {
        type: String,
        require: true,
        unique: true
    },
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
    },
    text:
    {
        type: String,
        require: true
    },
    rating:
    {
        type: Number,
        require: true
    },
    date_submitted:
    {
        type: Date,
        require: true
    }
}, { collection: 'reviews' });

const Review = mongoose.model('Review', reviewSchema);

export { Review };