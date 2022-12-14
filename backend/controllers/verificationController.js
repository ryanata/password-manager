const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const serviceSidPasswordReset = process.env.TWILIO_SERVICE_SID_RESET_PASSWORD;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);
const MEDIUM_PHONE = "phone";
const MEDIUM_EMAIL = "email";
const TYPE_PASSWORD_RESET = "passwordReset";
const TYPE_ACCOUNT_VERIFICATION = "verifyAccount";
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

    if (!contact) {   
        res.status(400);   
        const missingMedium = medium == MEDIUM_EMAIL ? "email" : "phone number";   
        throw new Error('Please enter ' + missingMedium);   
    }

    // implement creating a new 2FA if one already exists

    // Check for existing user
    const userExists = await User.findOne({ medium: contact });
    
    if (!userExists) {
        res.status(404);
        throw new Error('No user found with this ' + medium == MEDIUM_PHONE ? ' phone number' : ' email');
    }
    
    const channel = medium == MEDIUM_PHONE ? 'sms' : 'email';
    const sendTo = medium == MEDIUM_PHONE ? '+' + contact : contact;
    let verificationStatus = ""

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

    if (!contact) {   
        res.status(400);   
        const missingMedium = medium == MEDIUM_EMAIL ? "email" : "phone number";   
        throw new Error('Please enter ' + missingMedium);   
    }


    if (!verificationCode) {
        res.status(400);
        throw new Error('Please enter the verification code');
    }

    // Check for existing user
    const userExists = await User.findOne({ medium: contact });
    
    if (!userExists) {
        res.status(400);
        const missingMedium = medium == MEDIUM_EMAIL ? "email" : "phone number";   
        throw new Error('No user found with this ' + missingMedium);
    }

    const sendTo = medium == MEDIUM_PHONE ? '+' + contact : contact;
    let verificationStatus = ""

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
        if (type == TYPE_ACCOUNT_VERIFICATION) {
            if (verificationStatus == "approved") {
                const updatedUser = await User.updateOne({email: contact}, {emailVerified: true});
                
                if (updatedUser) {
                    res.status(200).json({
                        message: "Account was verified",
                    });
                } else {
                    res.status(400).json({
                        message: "Account could not be verified",
                    });
                }
            }
        }
        else {
            if (verificationStatus == "approved") {
                res.status(200).json({
                    message: 'Verification successful',
                });
            } else {
                res.status(400);
                throw new Error('Verification failed');
            }
        }
        
    } else {
        res.status(400);
        throw new Error('Verification issue');
    }
});

module.exports = {
    createVerification,
    checkVerification
}