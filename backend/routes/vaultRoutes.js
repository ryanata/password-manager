const express = require('express');
const router = express.Router();

const {
    createVault
} = require('../controllers/vaultController');

router.post('', createVault);

module.exports = router;