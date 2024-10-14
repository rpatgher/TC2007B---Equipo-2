import Stripe from 'stripe';

// ************* Models *************
import User from "../models/User.js";

// ************* Helpers *************
import generateJWT from "../helpers/generateJWT.js";
import generateToken from "../helpers/generateToken.js";
import sendEmail from "../helpers/sendEmail.js";

// This function creates a new user
const signUp = async (req, res) => {
    const { name, surname, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ msg: "User already exists." });
    }
    const token = generateToken();
    const user = new User({ 
        name, 
        surname, 
        email, 
        role: "donor",
        password,
        token
    });
    try {
        const createdUser = await user.save();
        await sendEmail({
            to: createdUser.email,
            subject: '¡Bienvenido a la Fundación Sanders! Confirma tu cuenta',
            template: 'confirm-account',
            context: {
                name: createdUser.name,
                url: `${process.env.FRONTEND_URL_DEV}/dashboard/confirmed-account/${createdUser.token}`,
            }
        });
        return res.status(201).json({
            msg: "Donor succesfully registered.",
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// This function logs in a user
const loginUser = async (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;
    // Find the user by the email
    const user = await User.findOne({ email: username });
    // console.log(user);
    // If the user is not found, return an error
    if (!user) {
        const error = new Error("User not found");
        return res.status(404).json({ msg: error.message });
    }
    // Validate the password
    if (await user.validPassword(password)) {
        if (!user.confirmed && user.role !== 'admin') {
            return res.status(401).json({ msg: "User not confirmed" });
        }
        // If the password is valid, return the user data and a token
        return res.status(200).json({
            msg: "User Logged In.",
            id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            token: generateJWT(user._id),
        });
    } else {
        // If the password is invalid, return an error
        const error = new Error("Invalid Password");
        return res.status(401).json({ msg: error.message });
    }
};

// This function confirms the user account
const confirmAccount = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ msg: "Invalid token" });
        }
        user.confirmed = true;
        user.token = '';
        await user.save();
        return res.status(200).json({ msg: "Account confirmed" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// This function sends a password reset email
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        user.token = generateToken();
        await user.save();
        await sendEmail({
            to: user.email,
            subject: 'Instrucciones para restablecer tu contraseña',
            template: 'reset-password',
            context: {
                name: user.name,
                url: `${process.env.FRONTEND_URL_DEV}/dashboard/reset-password/${user.token}`,
            }
        });
        return res.status(200).json({ msg: "Password reset email sent" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// This function resets the user password
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    console.log(token);
    try {
        const user = await User.findOne({
            token
        });
        if (!user) {
            return res.status(404).json({ msg: "Invalid token" });
        }
        user.password = password;
        user.token = '';
        await user.save();
        return res.status(200).json({ msg: "Password reset" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

// This function gets the permissions of a user
const permissions = async (req, res) => {
    // Get the user id from the request object (added by the checkAuth middleware)
    const { id } = req.user;
    try {
        // Find the user by the id
        const user = await User.findById(id);
        // If the user is not found, return an error
        if (!user) {
            const error = new Error("User not found.");
            return res.status(404).json({ msg: error.message });
        }
        // Return the user role
        return res.status(200).json({ role: user.role });
    } catch (error) {
        // If an error occurs, return an error
        return res.status(500).json({ msg: error.message });
    }
};

// This function handles the stripe payment
const stripeIntent = async (req, res) => {
    // return res.status(200).json({ msg: "To Handle Stripe Payment." });
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2020-08-27',
    });
    const { amount } = req.body;
    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "mxn",
        });

        // Return the client secret to the client
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { 
    signUp, 
    loginUser, 
    confirmAccount, 
    permissions, 
    stripeIntent,
    forgotPassword,
    resetPassword
};
