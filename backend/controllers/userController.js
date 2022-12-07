const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
var generator = require('generate-password');

// @desc    Send email
const sendEmail = asyncHandler(async (data) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "verifypwdly@gmail.com",
          pass: process.env.GMAIL_ACCOUNT_PASSWORD
        },
    });

    let mailOptions = {
        from: "pwdly",
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

// @desc    Create new user
// @route   POST /api/user/register
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
        twoFactorAuthEnabled: false,
        phone: phoneNumber,
        password: hashedPassword,
        name: {
            firstName: firstName,
            lastName: lastName,
        },
        twoFactorAuthEnabled: false,
    });

    if (user) {
        sendEmail({
            to: email,
            subject: "Verify your email",
            text: `Please click this link to verify your email: https://pwdly.herokuapp.com/api/user/${user._id}/verify`,
        });
        res.status(201).json({
            message: 'User created!',
            user: {
                id: user._id,
                firstName: user.name.firstName,
                lastName: user.name.lastName,
                email: user.email,
                phoneNumber: user.phone,
                emailVerified: user.emailVerified,
                twoFactorAuthEnabled: user.twoFactorAuthEnabled,
                token: generateToken(user._id),
            },
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Login user
// @route   POST /api/user/login
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
                twoFactorAuthEnabled: user.twoFactorAuthEnabled,
                token: generateToken(user._id),
            },
        });
    } else {
        res.status(401);
        throw new Error('Invalid password');
    }
});

// @desc    Get user data
// @route   GET /api/user/me
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})
    
// @desc verify user
// @route GET /api/user/:id/verify
const verifyUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    await checkUserExists(userId);

    // Find user by id and update emailVerified to true
    const user = await User.findByIdAndUpdate(userId, { emailVerified: true }, { new: true });
    if (user) {
        res.status(200).json({
            message: `That you for verifying your account ${user.name.firstName}!`,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Forgot password
// @route POST /api/user/forgotPassword
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error('Email not found');
    }

    // Send email with generated password
    const newPassword = generator.generate({
        length: 13,
        uppercase: true,
        numbers: true,
        symbols: true,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    const updated = await User.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });

    if (updated) {
        sendEmail({
            to: email,
            subject: "pwdly - Forgot password",
            text: `Hello ${user.name.firstName}, your new password is ${newPassword}`,
        });
        res.status(200).json({
            message: 'Password reset successful!',
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Update user
// @route   PUT /api/user/:id/update
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const { firstName, lastName, email, phoneNumber, password, twoFactorAuthEnabled, oldPassword } = req.body;

    if (!firstName && !lastName && !email && !phoneNumber && !password && twoFactorAuthEnabled === undefined) {
        res.status(400);
        throw new Error('Please enter ANY field');
    }

    const user = await checkUserExists(userId);

    if (firstName) {
        user.name.firstName = firstName;
    }
    if (lastName) {
        user.name.lastName = lastName;
    }
    if (email) {
        user.email = email;
        user.emailVerified = false;
    }
    if (phoneNumber) {
        user.phone = phoneNumber;
    }
    if (twoFactorAuthEnabled !== undefined) {
        user.twoFactorAuthEnabled = twoFactorAuthEnabled;
    }
    if (password) {
        if (!oldPassword) {
            res.status(400);
            throw new Error('Please enter your current password');
        }
        if (await bcrypt.compare(oldPassword, user.password)) {
            // Hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        } else {
            res.status(401);
            throw new Error('Invalid password');
        }
    }

    const updated = await user.save();

    if (updated) {
        res.status(200).json({
            message: 'User updated!',
            user: updated,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: '1d',
    })
}

// @desc Helper function to check if user exists
const checkUserExists = asyncHandler(async (userId, res) => {
    // Make sure userId is valid ObjectId and user exists
    const userExists = mongoose.Types.ObjectId.isValid(userId) ? await User.findById(userId) : false;
    if (!userExists) {
        res.status(400);
        throw new Error('User does not exist');
    }
    return userExists;
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
    verifyUser,
    forgotPassword,
    updateUser,
  }
