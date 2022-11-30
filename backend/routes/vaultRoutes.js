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
} = require('../controllers/vaultController');

const { protect } = require('../middleware/authMiddleware');

// // vaults
router.post('', createVault);
router.get('', protect, getVaults);
router.get('/:vaultID', getVault);

/** 
 * TODO: update vault
 * PRIORITY: low
 * Comments: We will use updateVault ONLY for changing name, master password, and mfa. Not very critical 
 */
// router.put('/:vaultID', updateVault);
/**
 * TODO: delete vault
 * PRIORITY: low
 * Comments: Delete vault, self-explanatory.
 */
// router.delete('/:vaultID', deleteVault);

/**
 * TODO: all tag api calls
 * PRIORITY: medium
 * Comments: We will need to create, get, update, and delete tags.
 */
// // tags
// router.post('/:vaultID/tag', createTag);
// router.get('/:vaultID/tag', getTags);
// router.put('/:vaultID/tag/:tagID', updateTag);
// router.delete('/:vaultID/tag/:tagID', deleteTag);

// sites
router.put('/:vaultID/site', updateSite);
router.delete('/:vaultID/site/:siteID', deleteSite);
router.put('/:vaultID/setSites', setSites);

// accounts
router.post('/:vaultID/site/account', createAccount);
router.delete('/:vaultID/site/:siteID/account/:accountID', deleteAccount);
router.put('/:vaultID/site/account/:accountID', updateAccount);

module.exports = router;