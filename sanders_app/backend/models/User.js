import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true,
    discriminatorKey: 'role'
});
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.validPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}
const User = mongoose.model('User', userSchema);
const Admin = User.discriminator('admin', new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    }],
    surname: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
}));
const Donor = User.discriminator('donor', new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: false
    }],
    token: {
        type: String,
        required: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
}));
const PhysicalDonor = User.discriminator('physical-donor', new mongoose.Schema({
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: false
    }],
    surname: {
        type: String,
        required: false,
        trim: true
    },
}, {
    timestamps: true
}));

export default User;
export {
    Admin,
    Donor,
    PhysicalDonor
};