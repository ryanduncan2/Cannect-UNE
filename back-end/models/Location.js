import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// TODO: disallow whitespace and other illegal username characters.
const locationSchema = new mongoose.Schema(
{
    clinic: 
    {
        type: Schema.Types.ObjectId,
        ref: 'Clinic',
        require: true
    },
    street_address: 
    {
        type: String,
        require: true,
    },
    suburb:
    {
        type: String,
    },
    state:
    {
        type: Number,
    }
}, { collection: 'locations' });

const Location = mongoose.model('Location', locationSchema);

export { Location };