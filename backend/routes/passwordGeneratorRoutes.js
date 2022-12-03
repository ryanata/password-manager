const express = require('express');
const router = express.Router();

const {
    generatePassword,
} = require('../controllers/passwordGeneratorController');

router.post('/', generatePassword);

module.exports = router;