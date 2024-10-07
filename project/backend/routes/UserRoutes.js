import express from "express";

// Importing the User Controller Functions
import {
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,
    getDonorsProjects
} from "../controllers/UserController.js";

// Create a Router for User endpoints
const router = express.Router();

// Importing the Check Auth and Check Admin Middleware
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";


// **************************** Endpoints Routes for User Model ****************************

// This route would be for explample /api/users
router.route("/")
    .post(checkAuth, checkAdmin, createUser) // Create a new User
    .get(checkAuth, checkAdmin, getUsers); // Get all Users


// This route would be for explample /api/users/1234492 (where 1234492 would be the id of the user)
router.route("/:id")
    .get(getUser) // Get a User by Id
    .put(updateUser) // Update a User by Id
    .delete(deleteUser); // Delete a User by Id

// This route would be for explample /api/users/donors-projects 
router.route("/donors-projects")
    .get(checkAuth, checkAdmin, getDonorsProjects); // Get all Physical Donors and all Projects 



export default router;