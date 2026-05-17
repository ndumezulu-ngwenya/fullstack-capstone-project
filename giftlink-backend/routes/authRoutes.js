
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const dotenv = require('dotenv');
const pino = require('pino');

const router = express.Router();

const logger = pino();

// Load environment variables
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;


router.post('/register', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase();

        // Task 2: Access MongoDB collection
        const collection = db.collection("users");

        // Task 3: Check for existing email
        const existingEmail = await collection.findOne({ email: req.body.email });
        if (existingEmail) {
            logger.warn(`Registration attempt failed: Email ${req.body.email} already exists`);
            return res.status(400).json({ error: "A user with this email already exists" });
        }

        // Hash the incoming password safely
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const email = req.body.email;

        // Task 4: Save user details in database
        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });

        // Task 5: Create JWT authentication with user._id as payload
        const payload = {
            user: {
                id: newUser.insertedId,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);

        // Success logging and response
        logger.info('User registered successfully');
        res.json({ authtoken, email });

    } catch (e) {
         logger.error(e, 'Error during user registration');
         return res.status(500).send('Internal server error');
    }
});

module.exports = router;