const express = require('express');
const router = express.Router();

const {
    generatePassword,
} = require('../controllers/passwordGeneratorController');

router.get('/', generatePassword);

module.exports = router;