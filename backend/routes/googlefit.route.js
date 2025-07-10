// routes/googlefit.routes.js
const express = require('express');
const router = express.Router();
const {
  authGoogleFit,
  googleFitCallback,
} = require('../controllers/googlefit.controller');

router.get('/auth', authGoogleFit);

router.get('/callback', googleFitCallback);

module.exports = router;
