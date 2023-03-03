const express = require('express');
const { registerUser, currentUser, loginUser } = require('../controllers/auth');
const auth = require('../middleware/authentication');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current', auth, currentUser);

module.exports = router;
