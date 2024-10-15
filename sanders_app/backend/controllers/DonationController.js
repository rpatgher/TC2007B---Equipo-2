import Donation from '../models/Donation.js';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Config from '../models/Config.js';

// **************** helpers ****************
import donationsAsigment from '../helpers/donationsAsigment.js';
import formatToMoney from '../helpers/formatToMoney.js';
import sendEmail from "../helpers/sendEmail.js";

// TODO: This can be improved by not repeating the code to create a donation in both cases (physical and digital donors)
// This function creates a new donation
const createDonation = async (req, res) => {
    // Get the user from the request object (added by the checkAuth middleware)
    const user = req.user;
    // Get the amount, donor, project and method from the request body
    const { amount, donor, project, method, asignment } = req.body;
    let donation;
    let donorUser;
    const config = await Config.findOne();
    if (user.role === 'admin') {
        // if the user is an admin, create a donation for a physical donor
        if (!amount || !donor) {
            // if the amount or donor (physical donor) is not provided, return an error
            return res.status(400).json({ msg: "Please enter all fields." });
        }
        // create a new donation
        donation = new Donation({
            amount,
            donor: donor.id,
            method: 'physical',
            project: project && project.id ? project.id : null
        });
        let projectDB = null;
        if (project && project.id) {
            // if the donation is associated with a project, update the project
            projectDB = await Project.findById(project.id);
            if (!projectDB) {
                return res.status(404).json({ msg: "Project not found." });
            }
            projectDB.donations.push(donation.id);
            // update the money raised by the project
            projectDB.money_raised += amount;
        }
        // find the donor by id to update the donations field
        donorUser = await User.findById(donor.id);
        if (!donorUser) {
            return res.status(404).json({ msg: "Donor not found." });
        }
        donorUser.donations.push(donation.id);
        try {
            // save the donation, donor and project
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
        // TODO: Save the payment id and status
        // if the user is not an admin, create a donation for a digital donor
        if (!amount || !method || !asignment) {
            // if the amount or method is not provided, return an error
            return res.status(400).json({ msg: "Please enter all fields." });
        }
        // create a new donation
        donation = new Donation({
            amount,
            method,
            donor: user.id
        });
        let projectDB = null;
        if(asignment === 'manual'){
            // if the donor wants to assign the donation to a project manually
            if(project && project.id){
                projectDB = await Project.findById(project.id);
                if (!projectDB) {
                    return res.status(404).json({ msg: "Project not found." });
                }
                donation.project = project.id;
                projectDB.donations.push(donation.id);
                // update the money raised by the project
                projectDB.money_raised += amount;
            }
        } else{
            // if the donor wants the system to assign the donation to a project automatically
            if (!config) {
                return res.status(500).json({ msg: "Internal Server Error." });
            }
            donation = await donationsAsigment[config.donations_asignment](donation);
        }
        // find the donor by id to update the donations field
        donorUser = await User.findById(user.id);
        if (!donorUser) {
            return res.status(404).json({ msg: "Donor not found." });
        }
        donorUser.donations.push(donation.id);
        try {
            // save the donation and donor
            await donation.save();
            await donorUser.save();
            const currentProject = projectDB ? projectDB : donation.projectInfo;
            const impact = config.impacts[currentProject.type];
            const amount_impact = amount / currentProject.money_goal * currentProject.impact;
            const milestones = currentProject.milestones.map(milestone => {
                return {
                    percentage: milestone.percentage,
                    description: milestone.description,
                    reached: milestone.reached
                }
            });;
            // calculate the progress of the project based on the milestone reached with the highest percentage
            const progress = Math.max(...milestones.map(milestone => milestone.reached ? milestone.percentage : 0));
            await sendEmail({
                to: donorUser.email,
                subject: '¡Gracias por tu generosa donación!',
                template: 'donation-confirmation',
                context: {
                    name: donorUser.name,
                    amount: formatToMoney(amount),
                    project: projectDB ? projectDB.name : donation.projectInfo ? donation.projectInfo.name : 'No asignado',
                    percentage: projectDB ? (projectDB.money_raised / projectDB.money_goal * 100).toFixed(0) : donation.projectInfo ? (donation.projectInfo.money_raised / donation.projectInfo.money_goal * 100).toFixed(0) : 0,
                    milestones,
                    progress,
                    generatedImpact: `${amount_impact.toFixed(0)} ${impact.unit} ${impact.description}`,
                    url: `${process.env.FRONTEND_URL_DEV}/dashboard/`,
                }
            });
            if (projectDB) {
                await projectDB.save();
            }
            return res.status(201).json({ msg: "Donation created successfully.", donation: donation.id });
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
    const config = await Config.findOne();
    const { impacts } = config;
    // Get the donation by id and populate the donor field and project field
    const donation = await Donation
        .findById(id)
        .select('-__v')
        .populate('donor', '_id name surname email') // populate the donor field with the name, surname and email
        .populate('project', '_id name image description type createdAt money_goal money_raised milestones impact') // populate the project field with the name, description, type, createdAt, money_goal and money_raised
        .lean();
    // If the donation is not found, return a 404 Not Found error
    if (!donation) {
        return res.status(404).json({ msg: "Donation not found." });
    }
    let generatedImpact;
    let impact;
    let amount_impact;
    if (donation.project) {
        impact = impacts[donation.project.type];
        amount_impact = donation.amount / donation.project.money_goal * donation.project.impact;
    }

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
            generatedImpact,
            ...donation.project
        } : null
    });
}

// This function updates a donation
const updateDonation = async (req, res) => {
    // Get the id from the request parameters
    const { id } = req.params;
    const { amount, donor, project } = req.body;
    // Get the user from the body to kwon if the current donor was made by a physical donor or a digital donor
    const donorDB = await User.findById(donor.id);
    if (!donorDB) {
        // If the donor is not found, return a 404 Not Found error
        return res.status(404).json({ msg: "Donor not found." });
    }
    // Get the donation by id
    const donation = await Donation.findById(id);
    if (!donation) {
        // If the donation is not found, return a 404 Not Found error
        return res.status(404).json({ msg: "Donation not found." });
    }
    // If the donor is a digital donor, the amount cannot be updated
    if (donorDB.role === 'physical-donor') {
        if (!amount) {
            return res.status(400).json({ msg: "Please enter all fields." });
        }
        // update the donation information with the new amount and donor
        donation.amount = amount;   
        donation.donor = donor.id;
    }
    let projectDB = null;
    if(project && project.id){
        // If the donation is associated with a project, update the project
        donation.project = project.id;
        // Get the project by id to update the donations field and money_raised field
        projectDB = await Project.findById(project.id);
        if (!projectDB) {
            return res.status(404).json({ msg: "Project not found." });
        }
        projectDB.donations.push(donation.id);
        projectDB.money_raised += amount;
    } else{
        // If the donation is not associated with a project, update the project field to null
        projectDB = await Project.findById(donation.project);
        donation.project = null;
        if (!projectDB) {
            return res.status(404).json({ msg: "Project not found." });
        }
        projectDB.donations = projectDB.donations.filter(d => d.toString() !== id);
        projectDB.money_raised -= donation.amount;
    }
    try {
        // save the donation, donor and project
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
    // Get the id from the request parameters
    const { id } = req.params;
    const donation = await Donation.findById(id);
    // if the donation is not found, return a 404 Not Found error
    if (!donation) {
        return res.status(404).json({ msg: "Donation not found." });
    }
    // Get the donor of the donation
    const donor = await User.findById(donation.donor);
    // if the donor is not found, return a 404 Not Found error
    if (!donor) {
        return res.status(404).json({ msg: "Donor not found." });
    }
    // if the donor is a digital donor, the donation cannot be deleted
    if (donor.role === 'donor') {
        return res.status(403).json({ msg: "Donations by digitla donors cannot be deleted." });
    }
    // if the donation is associated with a project, the donation cannot be deleted
    if (donation.project) {
        return res.status(400).json({ msg: "Donation is associated with a project." });
    }
    try {
        // delete the donation and update the donor
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