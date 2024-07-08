import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import User from './models/User';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new FacebookStrategy.Strategy({
  clientID: process.env.AUTH_FACEBOOK_ID,
  clientSecret: process.env.AUTH_FACEBOOK_SECRET,
  callbackURL: '/auth/signin/facebook/callback',
  profileFields: ['id', 'displayName', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ facebookId: profile.id });

    if (!user) {
      user = new User({
        facebookId: profile.id,
        displayName: profile.displayName,
        email: profile.emails ? profile.emails[0].value : null,
        accessToken,
      });
      await user.save();
    } else {
      user.accessToken = accessToken;
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
