const express = require('express');
const app = express()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(express.json())
const router = express.Router();
const User = require("../Models/User");
require("dotenv").config();
router.use(express.json());



// API to check existing email to prevent same email register 
router.post('/check-email', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            res.json({ emailExists: true });
        } else {
            res.json({ emailExists: false });
        }
    } catch (error) {
        console.error("Error checking email:", error);
        res.status(500).json({ error: "Failed to check email." });
    }
});

// API for the registration of new user
router.post("/register", async (req, resp) => {
    try {
        const { name, role, location, email, password } = req.body;

        // Generate salt value using bcrypt
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the generated salt
        const hashPassword = await bcrypt.hash(password, salt);
        // Create a new user with the hashed password
        const user = new User({
            name,
            role,
            location,
            email,
            password: hashPassword,
        });

        // Save the user to the database
        let result = await user.save();
        result = result.toObject();
        delete result.password;

        // Create and send a JWT token
        jwt.sign({ result }, `${process.env.JWT_KEY}`, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                resp.status(500).send("Something wrong, Please try later...");
            }
            else {
                // Log the decoded payload for debugging
                const decoded = jwt.decode(token);
                console.log('Decoded Token:', decoded);

                resp.send({ result, auth: token });
            }
        });
    } catch (error) {
        resp.status(500).send({ error: "Failed to register user." });
    }
});



// API for login
router.post("/login", async (req, resp) => {
    try {
        const { email, password } = req.body;

        if (email && password) {
            // Find user by email
            const user = await User.findOne({ email });

            if (user) {
                // Compare the provided password with the hashed password in the database
                const isPasswordMatch = await bcrypt.compare(password, user.password);

                if (isPasswordMatch) {
                    // IF Passwords match, generate and send JWT token
                    jwt.sign({ user }, `${process.env.JWT_KEY}`, { expiresIn: '2h' }, (err, token) => {
                        if (err) {
                            resp.status(500).send("Something wrong, Please try later...");
                        }
                        else {
                            // Log the decoded payload for debugging
                            const decoded = jwt.decode(token);
                            // console.log('Decoded Token:', decoded);
                            resp.send({ user, auth: token });
                        }
                    });
                } else {
                    resp.send({ result: "Invalid email or password." });
                }
            } else {
                resp.send({ result: "No user found." });
            }
        } else {
            resp.status(400).send({ result: "Invalid request. Please provide both email and password." });
        }
    } catch (error) {
        resp.status(500).send({ error: "Failed to login." });
    }
});

// API to change admin password
router.post("/changePassword/:id", async (req, resp) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            console.error("No user found with this email");
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        console.log(isPasswordMatch);

        if (!isPasswordMatch) {
            return resp.send({ result: "old password is incorrect" })
        }

        if (newPassword !== confirmPassword) {
            return resp.send({ result: "new password & confirm password doesn't matched." })
        }

        const hashNewPassword = await bcrypt.hash(newPassword, `${process.env.SALT}`)

        // Update the user's password in the database
        user.password = hashNewPassword;

        await user.save()
        resp.send({ result: "Password changed" })

    } catch (error) {
        resp.status(500).send({ error: "Failed to change password." });
    }
})


module.exports = router;