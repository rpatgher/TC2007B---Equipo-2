import Donation from '../models/Donation.js';


const createDonation = async (req, res) => {
    return res.status(200).json({ msg: "To Create a Donation (Not implemented yet)." });
}

const getDonations = async (req, res) => {
    return res.status(200).json({ msg: "To Get Donations (Not implemented yet)." });
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