import Donation from '../models/Donation.js';
import User from '../models/User.js';
import Project from '../models/Project.js';

// This function creates a new donation
const createDonation = async (req, res) => {
    const user = req.user;
    const { amount, donor, project, method } = req.body;
    let donation;
    if (user.role === 'admin') {
        if (!amount || !donor) {
            return res.status(400).json({ msg: "Please enter all fields." });
        }
        donation = new Donation({
            amount,
            donor: donor.id,
            method: 'physical',
            project: project && project.id ? project.id : null
        });
        let projectDB = null;
        if (project && project.id) {
            projectDB = await Project.findById(project.id);
            if (!projectDB) {
                return res.status(404).json({ msg: "Project not found." });
            }
            projectDB.donations.push(donation.id);
            projectDB.money_raised += amount;
        }
        const donorUser = await User.findById(donor.id);
        if (!donorUser) {
            return res.status(404).json({ msg: "Donor not found." });
        }
        donorUser.donations.push(donation.id);
        try {
            await donation.save();
            await donorUser.save();
            if (projectDB) {
                await projectDB.save();
            }
            return res.status(201).json({ msg: "Donation created successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal Server Error." });
        }
    } else{
        if (!amount || !method) {
            return res.status(400).json({ msg: "Please enter all fields." });
        }
        donation = new Donation({
            amount,
            method,
            donor: user.id
        });
        const donorUser = await User.findById(user.id);
        if (!donorUser) {
            return res.status(404).json({ msg: "Donor not found." });
        }
        donorUser.donations.push(donation.id);
    }
    try {
        await donation.save();
        await donorUser.save();
        return res.status(201).json({ msg: "Donation created successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
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
        .populate('project', 'name')
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
        .populate('project', '_id name description type createdAt money_goal money_raised')
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
    const { id } = req.params;
    const { amount, donor, project } = req.body;
    const donorDB = await User.findById(donor.id);
    if (!donorDB) {
        return res.status(404).json({ msg: "Donor not found." });
    }
    const donation = await Donation.findById(id);
    if (!donation) {
        return res.status(404).json({ msg: "Donation not found." });
    }
    if (donorDB.role === 'physical-donor') {
        if (!amount) {
            return res.status(400).json({ msg: "Please enter all fields." });
        }
        donation.amount = amount;   
        donation.donor = donor.id;
    }
    let projectDB = null;
    if(project && project.id){
        donation.project = project.id;
        projectDB = await Project.findById(project.id);
        if (!projectDB) {
            return res.status(404).json({ msg: "Project not found." });
        }
        projectDB.donations.push(donation.id);
        projectDB.money_raised += amount;
    } else{
        projectDB = await Project.findById(donation.project);
        donation.project = null;
        if (!projectDB) {
            return res.status(404).json({ msg: "Project not found." });
        }
        projectDB.donations = projectDB.donations.filter(d => d.toString() !== id);
        projectDB.money_raised -= donation.amount;
    }
    try {
        await donation.save();
        await donorDB.save();
        if (projectDB) {
            await projectDB.save();
        }
        return res.status(200).json({ msg: "Donation updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }
}

// This function deletes a donation
const deleteDonation = async (req, res) => {
    const { id } = req.params;
    const donation = await Donation.findById(id);
    if (!donation) {
        return res.status(404).json({ msg: "Donation not found." });
    }
    const donor = await User.findById(donation.donor);
    if (!donor) {
        return res.status(404).json({ msg: "Donor not found." });
    }
    if (donor.role === 'donor') {
        return res.status(403).json({ msg: "Donations by digitla donors cannot be deleted." });
    }
    if (donation.project) {
        return res.status(400).json({ msg: "Donation is associated with a project." });
    }
    try {
        await donation.deleteOne();
        donor.donations = donor.donations.filter(d => d.toString() !== id);
        await donor.save();
        return res.status(200).json({ msg: "Donation deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }

}


export {
    createDonation,
    updateDonation,
    getDonations,
    getDonation,
    deleteDonation
}