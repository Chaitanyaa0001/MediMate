const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      // ✅ Get role from 'state' parameter sent during the first request
      const role = req.query.state;

      if (!role || !['doctor', 'patient'].includes(role)) {
        return done(new Error('Invalid or missing role'), null);
      }

      const email = profile.emails[0].value;

      // Find existing user by email and role
      let user = await User.findOne({ email, role });

      // If not found, create a new user
      if (!user) {
        user = await User.create({
          username: profile.displayName,
          email,
          role,
          provider: 'google', // 👈 mark user as Google user
        });
      }

      return done(null, user);
    } catch (err) {
      console.error("Google Auth Error:", err);
      return done(err, null);
    }
  }
));
