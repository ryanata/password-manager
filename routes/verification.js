// Create register route
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);


router.post('/verification/phone', async (req, res, next) =>
    {
        const { phoneNumber } = req.body;

        try
        {
            const foundPhone = await User.findOne({ phone: phoneNumber });
            if (foundPhone === null)
            {
                updateStatusCode(404, 'Phone number not found');
                return;
            }

            await twilio.verify.v2.services(serviceSid)
                    .verifications
                    .create({to: '+' + phoneNumber, channel: 'sms'})
                    .then(verification => result = verification);
        }
        catch (e)
        {
            updateStatusCode(500, e.toString());
            return;
        }

        updateStatusCode(200, "Phone verification was sent")

        function updateStatusCode(statusCode, msg) {
            res.status(statusCode).json({
                message: msg,
            });
        }
    }
);

router.get('/verification/phone', async (req, res, next) =>
    {
        const { phoneNumber, verificationCode } = req.body;
        verificationStatus = ""

        try
        {
            const foundPhone = await User.findOne({ phone: phoneNumber });
            if (foundPhone === null)
            {
                updateStatusCode(404, 'Phone number not found');
                return;
            }
            
            await twilio.verify.v2.services(serviceSid)
                .verificationChecks
                .create({to: '+' + phoneNumber, code: verificationCode})
                .then(verification_check => verificationStatus = verification_check.status);

            if (verificationStatus == "approved") 
            {
                // verify the user
                await User.updateOne({emailVerified: true});
            }
        }
        catch (e)
        {
            updateStatusCode(500, e.toString());
            return;
        }

        updateStatusCode(200, verificationStatus)

        function updateStatusCode(statusCode, msg) {
            res.status(statusCode).json({
                message: msg
            });
        }
    }
);

module.exports = router;