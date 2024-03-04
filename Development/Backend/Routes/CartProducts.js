const express = require('express');
const Orders = require('../Models/Orders');
const router = express.Router();

router.post("/orderData", async (req, res) => {
    try {
        // Validate incoming data
        if (!req.body.email || !req.body.orderData) {
            return res.status(400).json({ success: false, message: "Email and order data are required" });
        }

        // Check if the email already exists in orders
        let existingOrder = await Orders.findOne({ email: req.body.email });

        if (!existingOrder) {
            // If email doesn't exist, create a new order
            await Orders.create({
                email: req.body.email,
                orderData: req.body.orderData
            });
        } else {
            // If email exists, update the order with new data
            existingOrder.orderData.push(...req.body.orderData);
            await existingOrder.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


// API for getting orderData for CartItems
router.post('/myOrderData', async (req, res) => {
    try {
        // Validate incoming data
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Find order data for the provided email
        const order = await Orders.findOne({ email });

        if (!order) {
            // If no order data found
            return res.status(404).json({ success: false, message: "No order data found for the provided email" });
        }

        res.json({ success: true, orderData: order.orderData });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;
