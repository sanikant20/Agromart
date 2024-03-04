const express = require('express');
const app = express()
app.use(express.json())
const router = express.Router();

const User = require("../Models/User");

const bcrypt = require('bcrypt');


// API to check if the entered old password matches the current password
router.post("/checkOldPassword", async (req, res) => {
    try {
        const { email, oldPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.error("No user found with this email");
            return res.status(404).json({ error: "No user found." });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        res.json({ passwordMatch: isPasswordMatch });
    } catch (error) {
        console.error("Error checking old password:", error);
        res.status(500).json({ error: "Failed to check old password." });
    }
});

// API to change admin password
router.post("/changePassword/:id", async (req, resp) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            console.error("No user found with this id");
            return resp.status(404).json({ error: "No user found." });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
            return resp.status(400).json({ result: "old password is incorrect" });
        }

        if (newPassword !== confirmPassword) {
            return resp.status(400).json({ result: "new password & confirm password don't match." });
        }

        const hashNewPassword = await bcrypt.hash(newPassword, SALT);

        // Update the user's password in the database
        user.password = hashNewPassword;

        await user.save();
        resp.json({ result: "Password changed" });

    } catch (error) {
        console.error("Error changing password:", error);
        resp.status(500).json({ error: "Failed to change password." });
    }
});

module.exports = router;
