const express = require('express');
const router = express.Router();

const {
    createVault,
    getVaults,
    updateVault,
    deleteVault,
    createTag,
    getTags,
    updateTag,
    deleteTag,
    createSite,
    getSites,
    updateSite,
    deleteSite,
    createAccount,
    getAccounts,
    updateAccount,
    deleteAccount,
} = require('../controllers/vaultController');

// vaults
router.post('', createVault);
router.get('', getVaults);
router.put('/:vaultID', updateVault);
router.delete('/:vaultID', deleteVault);

// tags
router.post('/:vaultID/tag', createTag);
router.get('/:vaultID/tag', getTags);
router.put('/:vaultID/tag/:tagID', updateTag);
router.delete('/:vaultID/tag/:tagID', deleteTag);

// sites
router.post('/:vaultID/site', createSite);
router.get('/:vaultID/site', getSites);
router.put('/:vaultID/site/:siteID', updateSite);
router.delete('/:vaultID/site/:siteID', deleteSite);

// accounts
router.post('/:vaultID/site/:siteID/account', createAccount);
router.get('/:vaultID/site/:siteID/account', getAccounts);
router.put('/:vaultID/site/:siteID/account/:accountID', updateAccount);
router.delete('/:vaultID/site/:siteID/account/:accountID', deleteAccount);


module.exports = router;