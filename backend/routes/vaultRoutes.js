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

// accounts
router.post('/:vaultID/account', createAccount);
router.get('/:vaultID/account', getAccounts);
router.put('/:vaultID/account/:accountID', updateAccount);
router.delete('/:vaultID/account/:accountID', deleteAccount);

router.post('/', createVault);
router.get('/', protect, getVaults);
router.get('/:vaultId', getVault);

module.exports = router;