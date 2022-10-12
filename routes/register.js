// Create register route
const { randomInt } = require('crypto');
const express = require('express');
const router = express.Router();

// Post requests
router.post('/register', (req, res, next) =>
    {
        const { email, password } = req.body;
        res.status(200).json({
            message: 'User created!',
            // Generate random user id by taking the first 8 digits of a random number to string
            userId: randomInt(10000000, 99999999).toString() + password[0] + email[0]
        });
    }
);

module.exports = router;