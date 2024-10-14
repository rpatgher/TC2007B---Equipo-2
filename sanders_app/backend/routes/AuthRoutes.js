import express from "express";

// Importing the Auth Controller Functions
import {
    signUp,
    loginUser,
    confirmAccount,
    permissions,
    stripeIntent,
    forgotPassword,
    resetPassword
} from "../controllers/AuthController.js";

// Create a Router for Auth endpoints
const router = express.Router();

// Importing the Check Auth Middleware
import checkAuth from "../middleware/checkAuth.js";

// **************************** Endpoints Routes for Authentication ****************************

// This route would be for example /api/auth/register
router.route("/register")
    .post(signUp); // Register a User

// This route would be for example /api/auth/login
router.route("/login")
    .post(loginUser); // Login a User

// This route would be for example /api/auth/confirm/dsjsdbczjniuh
router.route("/confirm/:token")
    .get(confirmAccount); // Confirm Account

// This route would be for example /api/auth/forgot-password
router.route("/forgot-password")
    .post(forgotPassword); // Forgot Password

// This route would be for example /api/auth/reset-password/dnfjasbdhbejN
router.route("/reset-password/:token")
    .post(resetPassword); // Reset Password

// This route would be for example /api/auth/stripe
router.route("/stripe")
    .post(checkAuth, stripeIntent); // Stripe Payment

// This route would be for example /api/auth/permisions
router.route("/permissions")
    .get(checkAuth, permissions); // Get User Role


export default router;