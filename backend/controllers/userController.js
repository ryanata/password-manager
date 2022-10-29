const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

// @desc    Create new user
// @route   GET /api/users/register
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

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        email: email,
        emailVerified: false,
        phone: phoneNumber,
        password: hashedPassword,
        name: {
            firstName: firstName,
            lastName: lastName,
        },
    });

    if (user) {
        res.status(201).json({
            message: 'User created!',
            user: {
                id: user._id,
                firstName: user.name.firstName,
                lastName: user.name.lastName,
                email: user.email,
                phoneNumber: user.phone,
                emailVerified: user.emailVerified,
                token: generateToken(user._id),
            },
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Login user
// @route   GET /api/users/login
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
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            message: 'User logged in!',
            user: {
                id: user._id,
                firstName: user.name.firstName,
                lastName: user.name.lastName,
                email: user.email,
                phoneNumber: user.phone,
                emailVerified: user.emailVerified,
                token: generateToken(user._id),
            },
        });
    } else {
        res.status(401);
        throw new Error('Invalid password');
    }
});

// @desc    Get user data
// @route   GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})
  
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: '1d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
  }