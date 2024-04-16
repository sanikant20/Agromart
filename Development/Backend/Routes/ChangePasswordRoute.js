const express = require('express');
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require('bcrypt');

// API to compare oldpassword : ADMIN
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

// API to change password: ADMIN
router.post("/changeAdminPassword", async (req, resp) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // Validate both old and new passwords
        if (!oldPassword || !newPassword) {
            return resp.status(400).json({ error: "Both old and new passwords are required." });
        }

        const user = await User.findOne({ email: email }); // Pass query object to findOne

        if (!user) {
            console.error("No user found with this email");
            return resp.status(404).json({ error: "No user found." });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
            return resp.status(400).json({ success: false, message: "Old password is incorrect." });
        }

        // Encrypt new password
        const SALT = await bcrypt.genSalt(10);
        const hashNewPassword = await bcrypt.hash(newPassword, SALT);

        // Update the user's password in the database
        user.password = hashNewPassword;
        await user.save();
        return resp.json({ success: true, message: "Password changed successfully." });

    } catch (error) {
        console.error("Error changing password:", error);
        return resp.status(500).json({ error: "Failed to change password." });
    }
});



//API to Change password : CUSTOMER
router.post('/changeUserPassword', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }

        // Encrypt new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        user.password = hashedPassword;
        await user.save();
        console.log("Password updated")
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error.message);
        res.status(500).json({ error: 'Failed to change password' });
    }
});


module.exports = router;
