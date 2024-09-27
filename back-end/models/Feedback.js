import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const feedbackSchema = new mongoose.Schema(
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
    text:
    {
        type: String,
        require: true
    },
    date_submitted:
    {
        type: Date,
        require: true
    }
}, { collection: 'feedback' });

const Feedback = mongoose.model('Feedback', feedbackSchema);

export { Feedback };