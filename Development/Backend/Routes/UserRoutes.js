const express = require('express');
const User = require('../Models/User');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const router = express.Router();

// APIs for Admin

// API to get all users from database and list users in AdminDashboard
router.get('/users', async (req, resp) => {
    try {
        let users = await User.find();
        if (users.length > 0) {
            resp.status(200).send({ success: true, users, totalUsers: users.length });
        } else {
            resp.status(404).send({ success: false, message: "There are no users in the database." });
        }
    } catch (error) {
        console.error("Error while fetching data: ", error);
        resp.status(500).send({ success: false, message: "Internal Server Error", error });
    }
});

// Api to get number of admin and customers : Dashboard
router.get('/total-admin-customer', async (req, resp) => {
    try {
        const users = await User.find();

        // Assuming User is an array of users
        const admin = users.filter(user => user.role.toLocaleLowerCase() === 'admin');
        const customer = users.filter(user => user.role.toLocaleLowerCase() === 'user');

        const totalAdmin = admin.length;
        const totalCustomer = customer.length;

        resp.status(200).send({ success: true, totalAdmin, totalCustomer });

    } catch (error) {
        console.error("Error while fetching total admin & customers: ", error);
        resp.status(500).send({ success: false, message: "Internal Server Error", error });
    }
});



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
 
// API to edit profile details : ADMIN
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

// =====================================================================
// APIs for users

// API to get User data for profile
router.get('/userData/:id', async (req, resp) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            throw new Error('User ID is undefined');
        }

        const userData = await User.findById(userId);
        if (userData) {
            resp.status(200).send(userData);
        } else {
            resp.status(404).send({ error: `There is no user with ID ${userId} in the database.` });
        }
    } catch (error) {
        console.error("Error while fetching data:", error);
        resp.status(500).send({ error: error.message });
    }
});


// API to edit user profile details
router.put("/editUserProfile/:id", async (req, resp) => {
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

// API to search users : ADMIN Portal
router.get("/searchUser/:key", async (req, res) => {
    try {
        let result = await User.find({
            '$or': [
                { name: { $regex: req.params.key, $options: 'i' } },
                { role: { $regex: req.params.key, $options: 'i' } },
                { location: { $regex: req.params.key, $options: 'i' } },
                { email: { $regex: req.params.key, $options: 'i' } },
            ]
        });
        res.send(result);
    } catch (error) {
        console.error(error)
    };

});

module.exports = router;
