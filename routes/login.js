// Create login route
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');

router.post('/login', async (req, res, next) =>
    {
        const { email, password } = req.body;

        try
        {
            // Check if email exists in database
            const foundEmail = await User.findOne({ email: email });
            if (foundEmail === null)
            {
                updateStatusCode(404, 'Email not found');
                return;
            }
            // Check if password matches email
            if (foundEmail.password === password) {
                res.status(200).json({
                    message: 'User logged in!',
                    user: foundEmail
                });
            } else {
                res.status(401).json({
                    message: 'Incorrect password!',
                });
            }
        }
        catch (e)
        {
            updateStatusCode(500, e.toString());
            return;
        }

        function updateStatusCode(statusCode, error) {
            res.status(statusCode).json({
                message: error,
            });
        }
    }
);

module.exports = router;