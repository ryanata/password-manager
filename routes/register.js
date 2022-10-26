// Create register route
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');

router.post('/register', async (req, res, next) =>
    {
        const { firstName, lastName, email, phoneNumber, password } = req.body;

        const newUser = { 
            email: email, 
            emailVerified: false,
            phone: phoneNumber, 
            password: password,
            name : {
                firstName: firstName,
                lastName: lastName,
            },
        }

        try
        {
            // Add newUser to database
            const createdUser = await User.create(newUser);
            res.status(200).json({
                message: 'User created!',
                user: createdUser
            });
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