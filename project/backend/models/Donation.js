import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    method: {
        type: String,
        enum: ['paypal', 'stripe', 'physical'],
        required: true
    }
},{
    timestamps: true
});

const Donation = mongoose.model('Donation', DonationSchema);
export default Donation;

