const { google } = require('googleapis');
require('dotenv').config();

console.log("CLIENT ID:", process.env.GOOGLE_CLIENT_ID,  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI); // debug

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = [
  'https://www.googleapis.com/auth/fitness.blood_pressure.read',
  'https://www.googleapis.com/auth/fitness.heart_rate.read',
  'https://www.googleapis.com/auth/fitness.oxygen_saturation.read'
];

// Step 1: Redirect user to Google Fit consent screen
exports.authGoogleFit = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });

  res.redirect(url);
};

// Step 2: Handle the OAuth2 callback
exports.googleFitCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // ✅ You should store tokens to database here for later use
    console.log('✅ Google Fit Tokens:', tokens);

    res.send('✅ Google Fit connected successfully! You may now close this tab.');
  } catch (err) {
    console.error('❌ Google Fit OAuth Error:', err.message);
    res.status(500).send('❌ Google Fit connection failed');
  }
};
