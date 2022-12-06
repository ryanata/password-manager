const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getMe,
    verifyUser,
    forgotPassword,
    updateUser
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotPassword', forgotPassword);
router.put('/:id/update', updateUser);
router.get('/me', protect, getMe);
router.put('/:id/verify', verifyUser);
module.exports = router;