const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { update } = require('../models/user');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const serviceSidPasswordReset = process.env.TWILIO_SERVICE_SID_RESET_PASSWORD;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);
const MEDIUM_PHONE = "phone";
const MEDIUM_EMAIL = "email";
const TYPE_PASSWORD_RESET = "passwordReset";
const TYPE_DEFAULT_VERIFICATION = "default";

const createVerification = asyncHandler(async (req, res) => {
    // get the medium of the request: sms or email are our accepted mediums
    const medium = req.query.medium;
    // email address or phone number
    const contact = req.params.contact;
    const type = req.query.type;

    // if this is for a password reset, we use the service allocated for that
    const twilioSid = type == TYPE_PASSWORD_RESET ? serviceSidPasswordReset : serviceSid;

    if (medium != MEDIUM_PHONE && medium != MEDIUM_EMAIL) {    
        res.status(400);
        throw new Error('Please enter a valid medium of request: ' + MEDIUM_PHONE + ' or ' + MEDIUM_EMAIL);
    }

    if (medium == MEDIUM_PHONE && !contact) {
        res.status(400);
        throw new Error('Please enter phone number');
    } else if (medium == MEDIUM_EMAIL && !contact) {
        res.status(400);
        throw new Error('Please enter email');
    }

    // Check for existing user
    const userExists = await User.findOne({ medium: contact });
    
    if (!userExists) {
        res.status(400);
        throw new Error('No user found with this ' + medium == MEDIUM_PHONE ? ' phone number' : ' email');
    }

    // check if user is already verified
    // if (userExists.emailVerified) {
    //     res.status(200).json({
    //         message: 'User is already verified',
    //     });
    //     return;
    // }
    
    channel = medium == MEDIUM_PHONE ? 'sms' : 'email';
    sendTo = medium == MEDIUM_PHONE ? '+' + contact : contact;
    verificationStatus = ""

    await twilio.verify.v2.services(twilioSid)
        .verifications
        .create({channelConfiguration: {
            substitutions: {
              contact: contact
            }
          },to: sendTo, channel: channel})
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
    // get the medium of the request: sms or email are our accepted mediums
    const medium = req.query.medium;
    const verificationCode = req.query.code;
    const passwordReset = req.query.passwordReset;
    // email address or phone number
    const contact = req.params.contact;
    const type = req.query.type;


    // if this is for a password reset, we use the service allocated for that
    const twilioSid = type == TYPE_PASSWORD_RESET ? serviceSidPasswordReset : serviceSid;

    if (medium != MEDIUM_PHONE && medium != MEDIUM_EMAIL) {    
        res.status(400);
        throw new Error('Please enter a valid medium of request: ' + MEDIUM_PHONE + ' or ' + MEDIUM_EMAIL);
    }

    if (medium == MEDIUM_PHONE && !contact) {
        res.status(400);
        throw new Error('Please enter phone number');
    } else if (medium == MEDIUM_EMAIL && !contact) {
        res.status(400);
        throw new Error('Please enter email');
    }


    if (!verificationCode) {
        res.status(400);
        throw new Error('Please enter the verification code');
    }

    // Check for existing user
    const userExists = await User.findOne({ medium: contact });
    
    if (!userExists) {
        res.status(400);
        throw new Error('No user found with this ' + medium == MEDIUM_PHONE ? ' phone number' : ' email');
    }

    sendTo = medium == MEDIUM_PHONE ? '+' + contact : contact;
    verificationStatus = ""

    // check if the verification exists
    // this is needed because the Twilio API returns a not found error
    // if the verification no longer exists
    try {
        await twilio.verify.v2.services(twilioSid)
            .verificationChecks
            .create({to: sendTo, code: verificationCode})
            .then(check => verificationStatus = check.status);
    } catch(e) {
        res.status(400);
        throw new Error('Verification does not exist: ' + e);
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