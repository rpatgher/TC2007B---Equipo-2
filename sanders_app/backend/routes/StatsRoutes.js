import express from "express";

// Importing the Stats Controller Functions
import {
    getStatsAdmin,
    getStatsDonor
} from "../controllers/StatsController.js";

// Create a Router for User endpoints
const router = express.Router();

// Importing the Check Auth and Check Admin Middleware
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";

// **************************** Endpoints Routes for Stats Model ****************************

// This route would be for explample /api/stats/admin
router.route("/admin")
    .get(checkAuth, checkAdmin, getStatsAdmin); // Get all Stats

router.route("/donor")
    .get(checkAuth, getStatsDonor); // Get all Stats



export default router;