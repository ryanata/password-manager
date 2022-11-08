const express = require('express');
const router = express.Router();

const {
    createVault,
    updateVault,
    createTag,
    updateTag
} = require('../controllers/vaultController');

router.post('', createVault);
router.put('/:vaultID', updateVault);
router.post('/:vaultID/tag', createTag);
router.put('/:vaultID/tag/:tagID', updateTag);


module.exports = router;