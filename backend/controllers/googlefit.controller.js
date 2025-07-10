const { google } = require('googleapis');
require('dotenv').config();
const GoogleFitToken = require('../models/google.fit.model');

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

// Step 1: Redirect to consent screen
exports.authGoogleFit = (req, res) => {
  const state = req.user.id;
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    state
  });
  res.redirect(url);
};

// Step 2: Callback to store tokens
exports.googleFitCallback = async (req, res) => {
  const { code, state: userId } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);

    await GoogleFitToken.findOneAndUpdate(
      { userId },
      { ...tokens, userId },
      { upsert: true, new: true }
    );

    res.send('✅ Google Fit connected successfully! You may now close this tab.');
  } catch (err) {
    console.error('❌ Google Fit Callback Error:', err.message);
    res.status(500).send('❌ Google Fit connection failed');
  }
};

// Step 3: Fetch health data
exports.fetchGoogleFitData = async (req, res) => {
  const userId = req.user.id;

  const userTokens = await GoogleFitToken.findOne({ userId });
  if (!userTokens) {
    return res.status(401).json({ message: 'User not connected with Google Fit' });
  }

  try {
    oauth2Client.setCredentials({
      access_token: userTokens.access_token,
      refresh_token: userTokens.refresh_token,
      scope: userTokens.scope,
      token_type: userTokens.token_type,
      expiry_date: userTokens.expiry_date
    });

    const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    const datasets = {
      heart: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
      bp: 'derived:com.google.blood_pressure:com.google.android.gms:merged',
      oxygen: 'derived:com.google.oxygen_saturation:com.google.android.gms:merged'
    };

    const fetchData = async (dataType) => {
      const dataset = `${oneDayAgo * 1000000}-${now * 1000000}`;
      const response = await fitness.users.dataSources.datasets.get({
        userId: 'me',
        dataSourceId: datasets[dataType],
        datasetId: dataset
      });
      console.log(`📊 Raw ${dataType} data:`, JSON.stringify(response.data, null, 2));

      const point = response.data.point?.[0];
      if (!point) return null;

      if (dataType === 'bp') {
        const systolic = point.value?.[0]?.fpVal;
        const diastolic = point.value?.[1]?.fpVal;
        return systolic && diastolic ? `${systolic}/${diastolic} mmHg` : 'N/A';
      }

      return point.value?.[0]?.fpVal;
    };

    const heartRate = await fetchData('heart');
    const bloodPressure = await fetchData('bp');
    const oxygen = await fetchData('oxygen');

    res.json({
      heartRate: heartRate ? `${heartRate} BPM` : 'N/A',
      bloodPressure: bloodPressure || 'N/A',
      oxygenLevel: oxygen ? `${(oxygen * 100).toFixed(1)}%` : 'N/A'
    });
  } catch (err) {
    console.error('❌ Google Fit Fetch Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch data from Google Fit' });
  }
};
