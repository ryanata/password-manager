const express = require('express');
const router = express.Router();

const {
    createVault,
    getVaults,
    getVault,
} = require('../controllers/newVaultController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createVault);
router.get('/', protect, getVaults);
router.get('/:vaultId', getVault);

module.exports = router;