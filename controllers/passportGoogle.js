const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../utils/keys');
const User = require('../models/User');

const googleCallbackURL = 'http://localhost:8080/v1/auth/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: googleCallbackURL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defalutUser = {
        firstName: `${profile.name.firstName}`,
        lastName: `${profile.name.lastName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };
      const existingUser = await User.find({
        where: { googleId: profile.id },
        default: defalutUser,
      }).catch((err) => {
        console.log('Error sign up', err);
        cb(err, null);
      });

      if (existingUser) {
        return cb(null, existingUser);
      }

      const newUser = await new User({ googleId: profile.id }).save();
      cb(null, newUser);
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log('Serializing user:', user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id } }).catch((err) => {
    console.log('Error deserializing', err);
    cb(err, null);
  });

  console.log('DeSerialized user', user);

  if (user) cb(null, user);
});
// passport.deserializeUser((id, cb) => {
// User.findById(id).then((user) => {
//   cb(null, user);
// });
// });
