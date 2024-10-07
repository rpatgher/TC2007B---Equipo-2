import Donation from '../models/Donation.js';

// This function creates a new donation
const createDonation = async (req, res) => {
    return res.status(200).json({ msg: "To Create a Donation (Not implemented yet)." });
}

// This function gets all donations
const getDonations = async (req, res) => {
    // TODO: Implement the filtering by name, email, phone, role
    const { range, sort, filter } = req.query;
    // Get the range and sort values
    const [start, end] = JSON.parse(range);
    const sortOrder = JSON.parse(sort);
    const sortBy = sortOrder[0];
    const order = sortOrder[1] === 'ASC' ? 1 : -1;
    let filterBy = '';
    // Get the user id and role from the request object (added by the checkAuth middleware)
    const { id, role } = req.user;
    let options = {};
    // If the user is an admin, get all donations
    if(role === 'admin'){
        options = {};
    }else{
        // If the user is not an admin, get only the donations of the user
        options = { donor: id };
    }
    // If the user is not an admin, get only the donations of the user
    let donations = await Donation
        .find(options)
        .select('-__v')
        .sort({ [sortBy]: order })
        .skip(start)
        .limit(end - start + 1)
        // .populate('project', 'name')
        .populate('donor', 'name surname email')
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
    // Get the total number of donations
    const total = await Donation.countDocuments(options);
    // Set the Content-Range and Access-Control-Expose-Headers headers
    res.set('Content-Range', `donations ${start}-${end}/${total}`);
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    // Return the donations
    return res.status(200).json(donations);
}


// This function gets a donation by id
const getDonation = async (req, res) => {
    const { id } = req.params;
    const donation = await Donation.findById(id).populate('donor', 'name surname email').lean();
    if (!donation) {
        return res.status(404).json({ msg: "Donation not found." });
    }
    const { _id } = donation;
    delete donation._id;
    return res.status(200).json({
        id: _id.toString(),
        ...donation
    });
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