const express = require('express');

const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
