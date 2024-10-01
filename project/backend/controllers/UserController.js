import User from '../models/User.js';


// This function gets all users
const getUsers = async (req, res) => {
    const { range, sort } = req.query;
    console.log(range, sort);
    // Get the range and sort values
    const [start, end] = JSON.parse(range);
    const sortOrder = JSON.parse(sort);
    const sortBy = sortOrder[0];
    const order = sortOrder[1] === 'ASC' ? 1 : -1;
    // Get all donors from the database
    let users = await User
        .find()
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