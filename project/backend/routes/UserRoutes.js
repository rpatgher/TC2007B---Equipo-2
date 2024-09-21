import express from "express";

// Importing the User Controller Functions
import {
    updateUser,
    getUsers,
    getUser,
    deleteUser    
} from "../controllers/UserController.js";

// Create a Router for User endpoints
const router = express.Router();

// Importing the Check Auth and Check Admin Middleware
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";


// **************************** Endpoints Routes for User Model ****************************

// This route would be for explample /api/users
router.route("/")
    .get(checkAuth, checkAdmin, getUsers); // Get all Users


// This route would be for explample /api/users/1234492 (where 1234492 would be the id of the user)
router.route("/:id")
    .get(getUser) // Get a User by Id
    .put(updateUser) // Update a User by Id
    .delete(deleteUser); // Delete a User by Id


export default router;