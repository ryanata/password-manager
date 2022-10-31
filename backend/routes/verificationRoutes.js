const express = require('express');
const router = express.Router();

const {
    createVerification,
    checkVerification
} = require('../controllers/verificationController');

router.post('', createVerification);
router.get('', checkVerification);

module.exports = router;