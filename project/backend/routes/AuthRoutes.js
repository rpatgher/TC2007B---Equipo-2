import express from "express";

// Importing the Auth Controller Functions
import {
    createUser,
    loginUser,
    logoutUser
} from "../controllers/AuthController.js";

// Create a Router for Auth endpoints
const router = express.Router();

// **************************** Endpoints Routes for Authentication ****************************

// This route would be for example /api/auth/register
router.route("/register")
    .post(createUser); // Register a User

// This route would be for example /api/auth/login
router.route("/login")
    .post(loginUser); // Login a User

// This route would be for example /api/auth/logout
router.route("/logout")
    .get(logoutUser); // Logout a User


export default router;