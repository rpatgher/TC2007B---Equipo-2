import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const Donation = mongoose.model('Donation', DonationSchema);
export default Donation;

