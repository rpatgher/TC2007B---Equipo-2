import express from 'express';

// Importing the Project Controller Functions
import {
    createProject,
    updateProject,
    getProjects,
    getProject,
    deleteProject
} from "../controllers/ProjectController.js";

// Create a Router for Project endpoints
const router = express.Router();

// Importing the Check Auth Middleware
import checkAuth from "../middleware/checkAuth.js";
// Importing the Check Admin Middleware
import checkAdmin from "../middleware/checkAdmin.js";
// Import the Upload Image Middleware
import uploadImage from "../middleware/uploadImage.js";

// **************************** Endpoints Routes for Project Model ****************************

// This route would be for explample /api/projects
router.route("/")
    .get(checkAuth, getProjects) // Get all projects
    .post(checkAuth, checkAdmin, uploadImage, createProject); // Create a projects

// This route would be for explample /api/projects/1234492 (where 1234492 would be the id of the project)
router.route("/:id")
    .get(checkAuth, checkAdmin, getProject) // Get a project by Id
    .put(checkAuth, checkAdmin, uploadImage, updateProject) // Update a project by Id
    .delete(checkAuth, checkAdmin, deleteProject); // Delete a project by Id


export default router;