const { Router } = require('express');
const passport = require('passport');
// const { isUserAuthenticated } = require('../middlewares/auth');

const googleRouter = Router();

const successLoginUrl = 'http://localhost:3000/login/sucess';
const errorLoginUrl = 'http://localhost:3000/login/error';

googleRouter.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

googleRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log('User: ', req.user);
    res.send('Thank you for signing in!');
  }
);

module.exports = googleRouter;
