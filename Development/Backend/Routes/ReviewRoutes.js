const express = require('express');
const router = express.Router();
const Review = require('../Models/ReviewModel');

// API to add review and rating for a product.
router.post("/addReview", async (req, res) => {
    try {
        const { userID, userName, productID, productName, rate, review } = req.body;

        // Check if required fields are provided
        if (!userID || !userName || !productID || !productName || !rate || !review) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if there is an existing review by the same user for the same product
        const existingReview = await Review.findOne({ userID, productID });

        if (existingReview) {
            // If an existing review is found, update the rating and review
            existingReview.rate = rate;
            existingReview.review = review;
            const updatedReview = await existingReview.save();
            res.status(200).json(updatedReview); // Respond with the updated review
        } else {
            // If no existing review is found, create a new review
            const newReview = new Review({
                userID,
                userName,
                productID,
                productName,
                rate,
                review
            });
            const savedReview = await newReview.save();
            res.status(201).json(savedReview); // Respond with the saved review
        }
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Internal Server Error" }); 
    }
});


// API to get the review and rating for a product with productID
router.get("/getReview/:id", async (req, res) => {
    try {
        const productId = req.params.id; 

        // Find all reviews for the specified product ID
        const reviews = await Review.find({ productID: productId });

        // Calculate the average rating for the product
        let totalRating = 0;
        if (reviews.length > 0) {
            totalRating = reviews.reduce((acc, curr) => acc + curr.rate, 0);
            totalRating /= reviews.length;
        }

        res.status(200).json({ reviews, averageRating: totalRating });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal Server Error" }); 
    }
});

// API to get reviews by product name
router.get("/searchReview/:key", async (req, res) => {
    try {
        let result = await Review.find({
            "$or": [
                { userID: { $regex: req.params.key, $options: 'i' } },
                { userName: { $regex: req.params.key, $options: 'i' } },
                { productID: { $regex: req.params.key, $options: 'i' } },
                { productName: { $regex: req.params.key, $options: 'i' } },
            ]
        });

        res.status(200).send(result);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = router;
