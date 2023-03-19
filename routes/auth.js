const express = require('express');
const auth = require('../middleware/authentication');

const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/auth');

router.post('/register', registerUser);
router.post('/login', auth, loginUser);

module.exports = router;
