import Donation from '../models/Donation.js';

// This function creates a new donation
const createDonation = async (req, res) => {
    const user = req.user;
    if (user.role === 'admin') {
        const { amount, donor, project } = req.body;
        if (!amount || !donor) {
            return res.status(400).json({ msg: "Please enter all fields." });
        }
        const donation = new Donation({
            amount,
            donor: donor.id,
            method: 'physical',
            project: project ? project.id : null
        });
        try {
            await donation.save();
            return res.status(201).json({ msg: "Donation created successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal Server Error." });
        }
    } else{
        const { amount, method } = req.body;
        if (!amount || !method) {
            return res.status(400).json({ msg: "Please enter all fields." });
        }
        const donation = new Donation({
            amount,
            method,
            donor: user.id
        });
        try {
            await donation.save();
            return res.status(201).json({ msg: "Donation created successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal Server Error." });
        }
    }
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
    // Get the donation by id and populate the donor field and project field
    const donation = await Donation
        .findById(id)
        .select('-__v')
        .populate('donor', '_id name surname email')
        .populate('project', '_id name')
        .lean();
    // If the donation is not found, return a 404 Not Found error
    if (!donation) {
        return res.status(404).json({ msg: "Donation not found." });
    }
    console.log(donation);
    const { _id } = donation;
    delete donation._id;
    return res.status(200).json({
        id: _id.toString(),
        ...donation,
        donor: donation.donor ? {
            id: donation.donor._id.toString(),
            ...donation.donor
        } : null,
        project: donation.project ? {
            id: donation.project._id.toString(),
            ...donation.project
        } : null
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