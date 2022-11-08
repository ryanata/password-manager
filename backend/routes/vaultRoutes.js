const express = require('express');
const router = express.Router();

const {
    createVault,
    updateVault
} = require('../controllers/vaultController');

router.post('', createVault);
router.put('/:vaultID', updateVault);

module.exports = router;