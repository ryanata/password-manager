const express = require('express');
const router = express.Router();

const {
    createVault,
    getVaults,
    getVault,
    updateVault,
    deleteVault,
    createTag,
    getTags,
    updateTag,
    deleteTag,
    updateSite,
    deleteSite,
    createAccount,
    updateAccount,
    deleteAccount,
    setSites,
    searchSites
} = require('../controllers/vaultController');

const { protect } = require('../middleware/authMiddleware');

// // vaults
router.post('', createVault);
router.get('', protect, getVaults);
router.get('/:vaultID', getVault);
router.delete('/:vaultID', deleteVault);

// // tags
router.get('/:vaultID/tags', getTags);
router.delete('/:vaultID/tag', deleteTag);

// sites
router.put('/:vaultID/site', updateSite);
router.delete('/:vaultID/site/:siteID', deleteSite);
router.put('/:vaultID/setSites', setSites);
router.get('/:vaultID/searchSites/:searchTerm', searchSites);

// accounts
router.post('/:vaultID/site/account', createAccount);
router.delete('/:vaultID/site/:siteID/account/:accountID', deleteAccount);
router.put('/:vaultID/site/account/:accountID', updateAccount);

module.exports = router;