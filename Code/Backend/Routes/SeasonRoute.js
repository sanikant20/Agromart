const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();

const Season = require('../Models/SeasonModal');
const Product = require('../Models/Product');

const { getCurrentSeason } = require('../utils/SeasonHelper');

// API to add new season
router.post('/addSeason', async (req, resp) => {
    try {
        // Check all field are present or not
        const requiredFields = ['seasonName', 'startMonth', 'endMonth'];
        const missingFields = requiredFields.filter(field => !req.body.hasOwnProperty(field));

        if (missingFields.length > 0) {
            return resp.status(400).json({ error: `Missing required field: ${missingFields.join(',')}` });
        }

        const season = new Season(req.body);
        const result = await season.save();
        resp.status(200).send(result);

    } catch (error) {
        console.error("Error while adding new season", error);
        resp.status(500).send("Internal Server Error");
    }
});

// API to get all season
router.get("/season", async (req, resp) => {
    try {
        let allSeason = await Season.find()
        if (allSeason.length > 0) {
            resp.status(200).send(allSeason)
        } else {
            resp.status(404).send({ result: "No season found." })
        }
    } catch (error) {
        console.log("Error in getting season", error)
        resp.status(500).send({ error: "Internal Server Error" })
    }
})

// API to fetch products with the current season
router.get("/seasonalProduct", async (req, res) => {
    try {
        // Get the current season
        const currentSeason = getCurrentSeason();

        // Find the seasonal ID for the current season
        const seasonalSeason = await Season.findOne({ seasonName: currentSeason });
        if (!seasonalSeason) {
            return res.status(404).json({ message: "No seasonal data found for the current season." });
        }

        // Find products with the current seasonal ID
        const seasonalProducts = await Product.find({ season: seasonalSeason._id });

        if (seasonalProducts.length > 0) {
            console.log("No. of season product:", seasonalProducts.length)
            res.status(200).send(seasonalProducts);
        } else {
            res.status(404).send({ message: "No seasonal products found for the current season." });
        }
    } catch (error) {
        console.error("Error fetching seasonal products:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

module.exports = router;
