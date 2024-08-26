const express = require('express');
const router = express.Router();
const ShippingDetails = require('../Models/ShippingModel');

// Api to add shipping details
router.post("/addShippingDetails", async (req, res) => {
    try {
        // Extract shipping details from request body
        const { userId, username, city, postalCode, address } = req.body;

        // Check if userId exists in the database
        const existingShippingDetails = await ShippingDetails.findOne({ userId });

        if (existingShippingDetails) {
            // If userId exists, update the existing shipping details
            existingShippingDetails.username = username;
            existingShippingDetails.city = city;
            existingShippingDetails.postalCode = postalCode;
            existingShippingDetails.address = address;

            // Save the updated shipping details
            await existingShippingDetails.save();
            return res.status(200).json({ message: "Shipping details updated successfully" });
        } else {
            // If userId doesn't exist, create a new shipping details object and save it to the database
            const newShippingDetails = new ShippingDetails({
                userId,
                username,
                city,
                postalCode,
                address,
            });
            await newShippingDetails.save();
            return res.status(200).json({ message: "Shipping details added successfully" });
        }
    } catch (error) {
        console.error("Error adding/updating shipping details:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// API to get shipping details
router.get("/shippingDetail/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const shippingDetails = await ShippingDetails.findOne({ userId });

        if (!shippingDetails) {
            return res.status(404).json({ success: false, error: "Shipping details not found for the user" });
        }

        res.status(200).json({ success: true, response: shippingDetails });
    } catch (error) {
        console.error("Error while fetching shipping details:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;
