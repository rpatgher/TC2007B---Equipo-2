// ************* Models *************
import User from '../models/User.js';

// ************* Helpers *************
import generateJWT from '../helpers/generateJWT.js';

const createUser = async (req, res) => {
    return res.status(200).json({ msg: "To Create a User (Not implemented yet)." });
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.findOne({ email: username });
    console.log(user);
    if(!user){
        const error = new Error("User not found.");
        return res.status(404).json({ msg: error.message });
    }
    if(await user.validPassword(password)){
        return res.status(200).json({ 
            msg: "User Logged In.",
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            token: generateJWT(user._id)
         });
    }else{
        const error = new Error("Invalid Password.");
        return res.status(401).json({ msg: error.message });
    }
}

const logoutUser = async (req, res) => {
    return res.status(200).json({ msg: "To Logout a User (Not implemented yet)." });
}

const permissions = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id);
        if(!user){
            const error = new Error("User not found.");
            return res.status(404).json({ msg: error.message });
        }
        return res.status(200).json({ role: user.role });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export {
    createUser,
    loginUser,
    logoutUser,
    permissions
}