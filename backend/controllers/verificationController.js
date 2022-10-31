const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { update } = require('../models/user');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);
const TYPE_PHONE = "phone";
const TYPE_EMAIL = "email";

const createVerification = asyncHandler(async (req, res) => {
    // get the type of the request: sms or email are our accepted mediums
    const type = req.query.type;
    const { phoneNumber, email } = req.body;

    if (type != TYPE_PHONE && type != TYPE_EMAIL) {    
        res.status(400);
        throw new Error('Please enter a valid type of request: ' + TYPE_PHONE + ' or ' + TYPE_EMAIL);
    }

    if (type == TYPE_PHONE && !phoneNumber) {
        res.status(400);
        throw new Error('Please enter phone number');
    } else if (type == TYPE_EMAIL && !email) {
        res.status(400);
        throw new Error('Please enter email');
    }

    // Check for existing user
    const userExists = await User.findOne({ type: type == TYPE_PHONE ? phoneNumber : email });
    
    if (!userExists) {
        res.status(400);
        throw new Error('No user found with this ' + type == TYPE_PHONE ? ' phone number' : ' email');
    }

    // check if user is already verified
    // if (userExists.emailVerified) {
    //     res.status(200).json({
    //         message: 'User is already verified',
    //     });
    //     return;
    // }
    
    sendTo = type == TYPE_PHONE ? '+' + phoneNumber : email;
    channel = type == TYPE_PHONE ? 'sms' : 'email';
    verificationStatus = ""
    await twilio.verify.v2.services(serviceSid)
        .verifications
        .create({to: sendTo, channel: channel})
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

const checkVerification = asyncHandler(async (req, res) => {
    // get the type of the request: sms or email are our accepted mediums
    const type = req.query.type;
    const { phoneNumber, email, verificationCode } = req.body;

    if (type != TYPE_PHONE && type != TYPE_EMAIL) {    
        res.status(400);
        throw new Error('Please enter a valid type of request: ' + TYPE_PHONE + ' or ' + TYPE_EMAIL);
    }

    if (type == TYPE_PHONE && !phoneNumber) {
        res.status(400);
        throw new Error('Please enter phone number');
    } else if (type == TYPE_EMAIL && !email) {
        res.status(400);
        throw new Error('Please enter email');
    }


    if (!verificationCode) {
        res.status(400);
        throw new Error('Please enter the verification code');
    }

    // Check for existing user
    const userExists = await User.findOne({ type: type == TYPE_PHONE ? phoneNumber : email });
    
    if (!userExists) {
        res.status(400);
        throw new Error('No user found with this ' + type == TYPE_PHONE ? ' phone number' : ' email');
    }

    sendTo = type == TYPE_PHONE ? '+' + phoneNumber : email;
    verificationStatus = ""
    // check if the verification exists
    try {
        await twilio.verify.v2.services(serviceSid)
            .verificationChecks
            .create({to: sendTo, code: verificationCode})
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

module.exports = {
    createVerification,
    checkVerification
}