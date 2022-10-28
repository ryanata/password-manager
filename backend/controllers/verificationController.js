const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { update } = require('../models/user');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);

const createVerificationPhone = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        res.status(400);
        throw new Error('Please enter phone number');
    }

    // Check for existing user
    const userExists = await User.findOne({ phone: phoneNumber });
    if (!userExists) {
        res.status(400);
        throw new Error('No user found with this phone number');
    }
    console.log(userExists);

    // check if user is already verified
    if (userExists.emailVerified) {
        res.status(200).json({
            message: 'User is already verified',
        });
        return;
    }
    
    verificationStatus = ""
    await twilio.verify.v2.services(serviceSid)
        .verifications
        .create({to: '+' + phoneNumber, channel: 'sms'})
        .then(check => verificationStatus = check.status);

    if (verificationStatus == "pending") {
        res.status(201).json({
            message: 'Verification created',
        });
    } else {
        res.status(400);
        throw new Error('Issue initiating verification');
    }
});

const checkVerificationPhone = asyncHandler(async (req, res) => {
    const { phoneNumber, verificationCode } = req.body;

    if (!phoneNumber || !verificationCode) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    // Check for existing user
    const userExists = await User.findOne({ phone: phoneNumber });
    if (!userExists) {
        res.status(400);
        throw new Error('No user found with this phone number');
    }

    verificationStatus = "";

    // check if the verification exists
    try {
        await twilio.verify.v2.services(serviceSid)
            .verificationChecks
            .create({to: '+' + phoneNumber, code: verificationCode})
            .then(check => verificationStatus = check.status);
    } catch(e) {
        res.status(400);
        throw new Error('Verification does not exist');
    }
    

    if (verificationStatus) {
        // verify the user
        // this is the line for the email verification, not for phone
        // const updatedUser = await User.updateOne({email: email}, {emailVerified: true});

        res.status(200).json({
            message: "Verification " + verificationStatus,
        });
        
    } else {
        res.status(400);
        throw new Error('Verification issue');
    }
});

const createVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Please enter email');
    }

    // Check for existing user
    const userExists = await User.findOne({ email });
    if (!userExists) {
        res.status(400);
        throw new Error('No user found with this email');
    }
    console.log(userExists);

    // check if user is already verified
    if (userExists.emailVerified) {
        res.status(200).json({
            message: 'User is already verified',
        });
        return;
    }
    
    verificationStatus = ""
    await twilio.verify.v2.services(serviceSid)
        .verifications
        .create({channelConfiguration: {
            template_id: 'd-76401c75169e4e0c95826a6146dae908',
            from: 'pwdlyverify@gmail.com',
            from_name: 'Pwdly'
        }, to: email, channel: 'email'})
        .then(check => verificationStatus = check.status);

    if (verificationStatus == "pending") {
        res.status(201).json({
            message: 'Verification created',
        });
    } else {
        res.status(400);
        throw new Error('Issue initiating verification');
    }
});

module.exports = {
    createVerificationPhone,
    checkVerificationPhone,
    createVerificationEmail
}