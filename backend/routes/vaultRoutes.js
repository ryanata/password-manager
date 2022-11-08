const express = require('express');
const router = express.Router();

const {
    createVault,
    updateVault,
    createTag
} = require('../controllers/vaultController');

router.post('', createVault);
router.put('/:vaultID', updateVault);
router.post('/:vaultID/tag', createTag);

module.exports = router;