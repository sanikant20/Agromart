const express = require('express');
const router = express.Router();
const ShippingDetails = require('../Models/ShippingModel');

// Api to get shipping details
router.post("/shippingDetails/:id", async (req, res) => {
    try {
        // Extract shipping details from request body
        const { userId, userName, country, city, postalCode, address } = req.body;

        // Check if userId exists in the database
        const existingShippingDetails = await ShippingDetails.findOne({ userId });

        if (existingShippingDetails) {
            // If userId exists, update the existing shipping details
            existingShippingDetails.country = country;
            existingShippingDetails.city = city;
            existingShippingDetails.postalCode = postalCode;
            existingShippingDetails.address = address;

            // Save the updated shipping details
            await existingShippingDetails.save();
            res.status(200).json({ message: "Shipping details updated successfully" });
        } else {
            // If userId doesn't exist, create a new shipping details object and save it to the database
            const newShippingDetails = new ShippingDetails({
                userId,
                userName,
                country,
                city,
                postalCode,
                address,
            });
            await newShippingDetails.save();
            res.status(200).json({ message: "Shipping details added successfully" });
        }
    } catch (error) {
        console.error("Error adding/updating shipping details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

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


// Api to get shipping details of the specific user

module.exports = router;
