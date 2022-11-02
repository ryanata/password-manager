const express = require('express');
const router = express.Router();

const {
    createVerification,
    checkVerification
} = require('../controllers/verificationController');

// contact is a phone number or email address
router.post('/:contact', createVerification);
router.get('/:contact', checkVerification);

module.exports = router;