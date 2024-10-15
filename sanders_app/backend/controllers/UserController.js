import User, { PhysicalDonor } from '../models/User.js';
import Project from '../models/Project.js';

const createUser = async (req, res) => {
    const { name, surname } = req.body;
    if (!name) {
        return res.status(400).json({ msg: "Please enter all fields." });
    }
    const user = new PhysicalDonor({ name, surname });
    try {
        await user.save();
        return res.status(201).json({ msg: "User created successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }
}

// This function gets all users
const getUsers = async (req, res) => {
    // TODO: Implement the filtering by name, email, phone, role
    const { range, sort, filter } = req.query;
    // Get the range and sort values
    const [start, end] = JSON.parse(range);
    const sortOrder = JSON.parse(sort);
    const sortBy = sortOrder[0];
    const order = sortOrder[1] === 'ASC' ? 1 : -1;
    // let filterBy = JSON.parse(filter).q;
    let filterBy = '';
    // console.log(filterBy);
    // Get all donors from the database
    let users = await User
        .find(filterBy !== '' ? {
            $or: [
                { surname: { $regex: filter, $options: 'i' } },
                { name: { $regex: filter, $options: 'i' } },
                { email: { $regex: filter, $options: 'i' } },
                { phone: { $regex: filter, $options: 'i' } },
                { role: { $regex: filter, $options: 'i' } }
            ]
        } : {})
        .where('role').ne('admin')
        .sort({ [sortBy]: order })
        .skip(start)
        .limit(end - start + 1)
        .select('-password -__v -updatedAt')
        .populate('donations', 'amount')
        .lean();
    // console.log(users);
    // Map the users to add an id field and remove the _id field
    users = users.map(user => {
        const { _id } = user;
        delete user._id;
        return {
            id: _id.toString(),
            ...user
        }
    });
    // Get the total number of users
    const total = await User.countDocuments({ role: { $ne: 'admin' } });
    // Set the Content-Range header to the total number of users
    res.set('Content-Range', `users ${start}-${end}/${total}`);
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    // Return the users
    return res.status(200).json(users);
}

// This function gets a user by id
const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
                .select('-password -__v -updatedAt')
                .populate({
                    path: 'donations',
                    select: 'amount createdAt project',
                    populate: {
                        path: 'project',
                        select: 'name description type'
                    }
                })
                .lean();
    console.log(user);
    if (!user) {
        return res.status(404).json({ msg: "User not found." });
    }
    const { _id } = user;
    delete user._id;
    return res.status(200).json({
        id: _id.toString(),
        ...user,
        donations: user.donations.map(donation => {
            const { _id } = donation;
            delete donation._id;
            return {
                id: _id.toString(),
                ...donation,
                project: donation.project ? {
                    id: donation.project._id.toString(),
                    ...donation.project
                } : null
            }
        })
    });
}

// This function updates a user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, surname } = req.body;
    if (!name || !surname) {
        return res.status(400).json({ msg: "Please enter all fields." });
    }
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ msg: "User not found." });
    }
    user.name = name;
    user.surname = surname;
    try {
        await user.save();
        return res.status(200).json({ msg: "User updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }
}

// This function deletes a user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ msg: "User not found." });
    }
    if (user.donations.length > 0) {
        return res.status(400).json({ msg: "User has donations. Please delete the donations first." });
    }
    try {
        await user.deleteOne();
        return res.status(200).json({ msg: "User deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }
}

const getDonorsAndProjects = async (req, res) => {
    let donors = await User.find().where('role').nin(['admin', 'donor']).lean();
    donors = donors.map(donor => {
        const { _id } = donor;
        delete donor._id;
        return {
            id: _id.toString(),
            ...donor
        }
    });
    let projects = await Project.find().lean();
    projects = projects.map(project => {
        const { _id } = project;
        delete project._id;
        return {
            id: _id.toString(),
            ...project
        }
    });
    return res.status(200).json({ donors, projects });
}

export {
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,
    getDonorsAndProjects
}