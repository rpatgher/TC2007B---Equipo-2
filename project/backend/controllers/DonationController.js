import Donation from '../models/Donation.js';

// This function creates a new donation
const createDonation = async (req, res) => {
    return res.status(200).json({ msg: "To Create a Donation (Not implemented yet)." });
}

// This function gets all donations
const getDonations = async (req, res) => {
    // Get the user id and role from the request object (added by the checkAuth middleware)
    const { id, role } = req.user;
    // If the user is an admin, get all donations
    if(role === 'admin'){
        // Get all donations from the database
        let donations = await Donation
            .find()
            .select('-__v')
            .lean();
        // Map the donations to add an id field and remove the _id field
        donations = donations.map(donation => {
            const { _id } = donation;
            delete donation._id;
            return {
                id: _id.toString(),
                ...donation
            }
        });
        // Return the donations
        return res.status(200).json(donations);
    }else{
        // If the user is not an admin, get only the donations of the user
        let donations = await Donation
            .find({ donor: id })
            .select('-__v')
            .lean();
        // Map the donations to add an id field and remove the _id field
        donations = donations.map(donation => {
            const { _id } = donation;
            delete donation._id;
            return {
                id: _id.toString(),
                ...donation
            }
        });
        // Return the donations
        return res.status(200).json(donations);
    }
}


// This function gets a donation by id
const getDonation = async (req, res) => {
    return res.status(200).json({ msg: "To Get a Donation (Not implemented yet)." });
}

// This function updates a donation
const updateDonation = async (req, res) => {
    return res.status(200).json({ msg: "To Update a Donation (Not implemented yet)." });
}

// This function deletes a donation
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