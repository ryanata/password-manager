const express = require('express');
const router = express.Router();

const {
    createVault,
    getVaults,
    updateVault,
    createTag,
    updateTag,
    createSite,
    updateSite,
    createAccount
} = require('../controllers/vaultController');

router.post('', createVault);
router.get('', getVaults);
router.put('/:vaultID', updateVault);
router.post('/:vaultID/tag', createTag);
router.put('/:vaultID/tag/:tagID', updateTag);
router.post('/:vaultID/site', createSite);
router.put('/:vaultID/site/:siteID', updateSite);
router.post('/:vaultID/site/:siteID/account', createAccount);



module.exports = router;