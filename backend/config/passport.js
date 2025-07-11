const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_AUTH_CALLBACK,
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      // ✅ Get role from `req.query.state` only during the initial call
      // But in the callback, `state` is passed separately in params (4th argument)
      const role = req.query?.state || req.session?.oauthState || req.body?.state || req.params?.state;

      // ❗ Or even safer:
      const callbackUrl = new URL(req.originalUrl, `${req.protocol}://${req.get('host')}`);
      const roleFromState = callbackUrl.searchParams.get("state");

      if (!roleFromState || !['doctor', 'patient'].includes(roleFromState)) {
        return done(new Error('Invalid or missing role'), null);
      }

      const email = profile.emails[0].value;

      let user = await User.findOne({ email, role: roleFromState });

      if (!user) {
        user = await User.create({
          username: profile.displayName,
          email,
          role: roleFromState,
          provider: 'google',
        });
      }

      return done(null, user);
    } catch (err) {
      console.error("Google Auth Error:", err);
      return done(err, null);
    }
  }
));
