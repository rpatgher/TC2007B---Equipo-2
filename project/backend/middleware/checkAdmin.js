
const checkAdmin = async (req, res, next) => {
    const { role } = req.user;
    if(role === 'admin'){
        return next();
    }
    return res.status(401).json({ msg: "Unauthorized." });
}

export default checkAdmin;