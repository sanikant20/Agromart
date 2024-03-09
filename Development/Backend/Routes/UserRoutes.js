const express = require('express');
const User = require('../Models/User');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const router = express.Router();


// API to get all users from database and list users in card AdminDashboard
router.get('/users', async (req, resp) => {
    try {
        let users = await User.find();
        // console.log(users)
        if (users.length > 0) {
            resp.status(200).send(users)
        } else {
            resp.status(404).send(error, "There is no user in database.")
        }
    } catch (error) {
        console.error("Erroe while fetching data: ", error)
        resp.status(500).send(error, " Internal Server Error")
    }
})



// API to get admin data for profile
router.get('/adminProfile/:id', async (req, resp) => {
    const userId = req.params.id;

    // Validate if the provided ID is in a valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return resp.status(400).send({ error: 'Invalid user ID format.' });
    }

    try {
        const userData = await User.findOne({ _id: userId });

        if (userData) {
            resp.status(200).send(userData);
        } else {
            resp.status(404).send({ error: `There is no user with ID ${userId} in the database.` });
        }
    } catch (error) {
        console.error("Error while fetching data:", error);
        resp.status(500).send({ error: 'Internal Server Error' });
    }
});

// API to edit profile details
router.put("/editProfile/:id", async (req, resp) => {
    try {
        const data = await User.updateOne({
            _id: req.params.id
        },
            {
                $set: req.body
            })
        resp.send(data)
    } catch (error) {
        console.error("Error in updating product details:", error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
})


// API to get User data for profile
router.get('/userData/:id', async (req, resp) => {
    
    try {
        const userId = req.params.id;
        const userData = await User.findById( userId );

        if (userData) {
            resp.status(200).send(userData);
        } else {
            resp.status(404).send({ error: `There is no user with ID ${userId} in the database.` });
        }
    } catch (error) {
        console.error("Error while fetching data:", error);
        resp.status(500).send({ error: 'Internal Server Error' });
    }
});


module.exports = router;
