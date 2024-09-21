import express from "express";

// Importing the Auth Controller Functions
import {
    createUser,
    loginUser,
    logoutUser,
    permissions
} from "../controllers/AuthController.js";

// Create a Router for Auth endpoints
const router = express.Router();

// Importing the Check Auth Middleware
import checkAuth from "../middleware/checkAuth.js";

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

// This route would be for example /api/auth/permisions
router.route("/permissions")
    .get(checkAuth, permissions); // Get User Role


export default router;