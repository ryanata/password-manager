const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    // Check for existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        email: email,
        emailVerified: false,
        phone: phoneNumber,
        password: password,
        name: {
            firstName: firstName,
            lastName: lastName,
        },
    });

    if (user) {
        res.status(201).json({
            message: 'User created!',
            user: user,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error('Email not found');
    }
    if (user && user.password === password){
        res.status(200).json({
            message: 'User logged in!',
            user: user,
        });
    } else {
        res.status(401);
        throw new Error('Invalid password');
    }
});

module.exports = {
    registerUser,
    loginUser,
}