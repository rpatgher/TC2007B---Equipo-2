import express from "express";

// Importing the Config Controller Functions
import {
    getConfig,
    updateDonationsAsignConfig,
    updateDonationsImpactsConfig
} from "../controllers/ConfigController.js";


// Create a Router for Config endpoints
const router = express.Router();

// Importing the Check Auth Middleware
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";

// **************************** Endpoints Routes for Config Model ****************************

// This route would be for explample /api/config
router.route("/")
    .get(checkAuth, checkAdmin, getConfig) // Get the Config

router.route("/donations-asignment")
    .put(checkAuth, checkAdmin, updateDonationsAsignConfig); // Update the Config

router.route("/impacts")
    .put(checkAuth, checkAdmin, updateDonationsImpactsConfig); // Update the Config

export default router;