const express = require('express');
const app = express()
app.use(express.json())
const router = express.Router();

const User = require("../Models/User");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = "agromartmernstackproject";

const { body, validationResult } = require('express-validator');



// API for register
router.post(
    '/register',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 5 }),
    ],
    async (req, resp) => {
        // Error validation for request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }

        try {
            // Check if the email already exists in the database
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return resp
                    .status(400)
                    .json({ success: false, errors: [{ msg: 'User with provided email already exists. Please use another email' }] });
            }

            // Make password secure
            const SALT = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, SALT);

            // Create new user with the valid info
            await User.create({
                name: req.body.name,
                role: req.body.role,
                location: req.body.location,
                email: req.body.email,
                password: securePassword,
            });

            return resp.status(200).json({ success: true, msg: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            return resp.status(500).json({ success: false, errors: [{ msg: 'Internal server error occurred.' }] });
        }
    }
);

// API for login
router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],
    async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }

        try {
            const filter = { email: req.body.email };
            const userData = await User.findOne(filter);

            if (!userData) {
                // Avoid revealing whether the email exists
                return resp.status(400).json({ errors: [{ msg: "Invalid credentials." }] });
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);

            if (!isPasswordValid) {
                return resp.status(400).json({ errors: [{ msg: "Invalid credentials." }] });
            }

            // Create a token with user ID
            const authToken = jwt.sign({ user: { id: userData.id } }, jwtSecret);

            return resp.json({ success: true, authToken: authToken });

        } catch (error) {
            console.error(error);
            return resp.status(500).json({ errors: [{ msg: "Internal server error." }] });
        }
    });

module.exports = router;