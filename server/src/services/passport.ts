import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/User";
import { config } from "dotenv";

config();

passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.AUTH_FACEBOOK_ID!,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
      callbackURL: process.env.AUTH_FACEBOOK_CALLBACK_URL!,
      profileFields: ["id", "displayName", "email", "picture.type(large)"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          user = new User({
            facebookId: profile.id,
            username: profile.displayName,
            email: (profile.emails && profile.emails[0].value) || "",
            profilePicUrl: profile.photos ? profile.photos[0].value : "",
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
