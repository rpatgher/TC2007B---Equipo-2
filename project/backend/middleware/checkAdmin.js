
// Middleware to check if the user is an admin
const checkAdmin = async (req, res, next) => {
    // Get the role from the user object (it was added in the auth middleware)
    const { role } = req.user;
    // If the role is admin, continue with the request
    if(role === 'admin'){
        return next();
    }
    // If the role is not admin, return an error of unauthorized
    return res.status(401).json({ msg: "Unauthorized." });
}

export default checkAdmin;