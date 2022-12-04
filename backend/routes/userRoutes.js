const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getMe,
    verifyUser
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/:id/verify', verifyUser);
module.exports = router;