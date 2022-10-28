const express = require('express');
const router = express.Router();

const {
    createVerificationPhone,
    checkVerificationPhone,
    createVerificationEmail
} = require('../controllers/verificationController');

router.post('/phone', createVerificationPhone);
router.get('/phone', checkVerificationPhone);
router.post('/email', createVerificationEmail)

module.exports = router;