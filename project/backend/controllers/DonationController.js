import Donation from '../models/Donation.js';


const createDonation = async (req, res) => {
    return res.status(200).json({ msg: "To Create a Donation (Not implemented yet)." });
}

const getDonations = async (req, res) => {
    const { id, role } = req.user;
    if(role === 'admin'){
        let donations = await Donation
            .find()
            .select('-__v')
            .lean();
        donations = donations.map(donation => {
            const { _id } = donation;
            delete donation._id;
            return {
                id: _id.toString(),
                ...donation
            }
        });
        return res.status(200).json(donations);
    }else{
        let donations = await Donation
            .find({ donor: id })
            .select('-__v')
            .lean();
        donations = donations.map(donation => {
            const { _id } = donation;
            delete donation._id;
            return {
                id: _id.toString(),
                ...donation
            }
        });
        return res.status(200).json(donations);
    }
}

const getDonation = async (req, res) => {
    return res.status(200).json({ msg: "To Get a Donation (Not implemented yet)." });
}

const updateDonation = async (req, res) => {
    return res.status(200).json({ msg: "To Update a Donation (Not implemented yet)." });
}

const deleteDonation = async (req, res) => {
    return res.status(200).json({ msg: "To Delete a Donation (Not implemented yet)." });
}


export {
    createDonation,
    updateDonation,
    getDonations,
    getDonation,
    deleteDonation
}