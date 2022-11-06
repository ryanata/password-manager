const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    addVault
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/addVault', protect, addVault);

module.exports = router;