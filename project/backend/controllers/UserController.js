import User from '../models/User.js';

const getUsers = async (req, res) => {
    // TODO: Restrict the authorization to Admins only
    let users = await User
        .find()
        .select('-password -__v')
        .lean();
    users = users.map(user => {
        const { _id } = user;
        delete user._id;
        return {
            id: _id.toString(),
            ...user
        }
    });
    return res.status(200).json(users);
    // return res.status(200).json({ msg: "To Get Users (Not implemented yet)." });
}

const getUser = async (req, res) => {
    return res.status(200).json({ msg: "To Get a User (Not implemented yet)." });
}

const updateUser = async (req, res) => {
    return res.status(200).json({ msg: "To Update a User (Not implemented yet)." });
}

const deleteUser = async (req, res) => {
    return res.status(200).json({ msg: "To Delete a User (Not implemented yet)." });
}


export {
    updateUser,
    getUsers,
    getUser,
    deleteUser
}