const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('./db'); 

// Task 1: Use the `body`, `validationResult` from `express-validator` for input validation
const { body, validationResult } = require('express-validator');

// Ensure you have your secret key configured (e.g., from dotenv)
const JWT_SECRET = process.env.JWT_SECRET; 

router.put('/update', async (req, res) => {
    // Task 2: Validate the input using `validationResult` and return appropriate message if there is an error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Validation errors in update request', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Task 3: Check if `email` is present in the header and throw an appropriate error message if not present.
        const email = req.headers.email;
        if (!email) {
            console.error('Email not found in the request headers');
            return res.status(400).json({ error: "Email not found in the request headers" });
        }

        // Task 4: Connect to giftsdb in MongoDB through connectToDatabase in db.js and access users collection.
        const db = await connectToDatabase();
        const collection = db.collection("users");

        // Task 5: Find user credentials in database
        const existingUser = await collection.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        existingUser.updatedAt = new Date();

        // Task 6: Update user credentials in database
        const updatedUser = await collection.findOneAndUpdate(
            { email },
            { $set: existingUser },
            { returnDocument: 'after' }
        );

        // Task 7: Create JWT authentication with user._id as payload using secret key from .env file
        const payload = {
            user: {
                // Ensure we get the _id correctly based on the MongoDB driver response
                id: (updatedUser.value || updatedUser)._id.toString(), 
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ authtoken });
    } catch (e) {
        console.error('Error updating user profile:', e);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;