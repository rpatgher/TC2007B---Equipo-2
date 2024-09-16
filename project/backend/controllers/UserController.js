import User from '../models/User.js';


const createUser = async (req, res) => {
    return res.status(200).json({ msg: "To Create a User (Not implemented yet)." });
}

const getUsers = async (req, res) => {
    return res.status(200).json({ msg: "To Get Users (Not implemented yet)." });
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
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser
}