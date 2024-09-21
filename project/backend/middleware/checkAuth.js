import jwt from "jsonwebtoken";
import User from "../models/User.js";

// This middleware checks if the user is authenticated
const checkAuth = async (req, res, next) => {
    let token;
    // Check if the authorization header is present and if it starts with 'Bearer'
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get the token from the header without the 'Bearer' part
            token = req.headers.authorization.split(' ')[1];
            // Decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Find the user by the id from the token in the database and remove the password, __v, createdAt, and updatedAt fields
            const user = await User.findById(decoded.id).select('-password -__v -createdAt -updatedAt');
            // If the user is found, add it to the request object
            if(user){
                req.user = user;
            }else{
                // If the user is not found, return an error
                const error = new Error('An error occurred');
                return res.status(404).json({msg: error.message});
            }
            // Continue with the request
            return next();
        } catch (error) {
            // If an error occurs, return an error
            console.error(error);
            return res.status(404).json({msg: 'An error occurred'});
        }
    }
    // If the token is not present, return an error
    if(!token){
        const error = new Error('Invalid token');
        return res.status(401).json({msg: error.message});
    }
    next();
}

export default checkAuth;