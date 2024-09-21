import express from "express";

// Importing the Donation Controller Functions
import {
    createDonation,
    updateDonation,
    getDonations,
    getDonation,
    deleteDonation    
} from "../controllers/DonationController.js";

// Create a Router for Donation endpoints
const router = express.Router();

// Importing the Check Auth Middleware
import checkAuth from "../middleware/checkAuth.js";

// **************************** Endpoints Routes for Dontation Model ****************************

// This route would be for explample /api/donations
router.route("/")
    .get(checkAuth, getDonations) // Get all Donations
    .post(createDonation); // Create a Donation

// This route would be for explample /api/donations/1234492 (where 1234492 would be the id of the donation)
router.route("/:id")
    .get(getDonation) // Get a Donation by Id
    .put(updateDonation) // Update a Donation by Id
    .delete(deleteDonation); // Delete a Donation by Id
    

export default router;