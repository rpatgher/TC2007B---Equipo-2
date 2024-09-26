import User from '../models/User.js';


// This function gets all users
const getUsers = async (req, res) => {
    // Get all donors from the database
    let users = await User
        .find()
        .where('role').ne('admin')
        .select('-password -__v')
        .lean();
    // Map the users to add an id field and remove the _id field
    users = users.map(user => {
        const { _id } = user;
        delete user._id;
        return {
            id: _id.toString(),
            ...user
        }
    });
    // Return the users
    return res.status(200).json(users);
}

// This function gets a user by id
const getUser = async (req, res) => {
    return res.status(200).json({ msg: "To Get a User (Not implemented yet)." });
}

// This function updates a user
const updateUser = async (req, res) => {
    return res.status(200).json({ msg: "To Update a User (Not implemented yet)." });
}

// This function deletes a user
const deleteUser = async (req, res) => {
    return res.status(200).json({ msg: "To Delete a User (Not implemented yet)." });
}


export {
    updateUser,
    getUsers,
    getUser,
    deleteUser
}