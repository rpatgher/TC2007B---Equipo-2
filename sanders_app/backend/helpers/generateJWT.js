import jwt from 'jsonwebtoken';

// This function generates a JWT token with the user id and the secret key
const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

export default generateJWT;