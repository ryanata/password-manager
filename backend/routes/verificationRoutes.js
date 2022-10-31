const express = require('express');
const router = express.Router();

const {
    createVerification,
    checkVerification
} = require('../controllers/verificationController');

router.post('/:contact', createVerification);
router.get('/:contact', checkVerification);

module.exports = router;