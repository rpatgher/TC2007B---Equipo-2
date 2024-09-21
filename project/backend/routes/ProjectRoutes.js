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

// **************************** Endpoints Routes for Project Model ****************************

// This route would be for explample /api/projects
router.route("/")
    .get(getProject) // Get all projects
    .post(createProject); // Create a projects

// This route would be for explample /api/projects/1234492 (where 1234492 would be the id of the project)
router.route("/:id")
    .get(getProjects) // Get a project by Id
    .put(updateProject) // Update a project by Id
    .delete(deleteProject); // Delete a project by Id


export default router;