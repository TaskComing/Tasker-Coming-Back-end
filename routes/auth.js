const express = require('express');
const passport = require('passport');
const auth = require('../middleware/authentication');

const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/auth');

router.post('/register', registerUser);
router.post('/login', auth, loginUser);

// v1/auth/google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
// v1/auth/google/callback
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  // Redirect the user to the homepage or another route after successful authentication
  res.redirect('/');
});
// v1/auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
