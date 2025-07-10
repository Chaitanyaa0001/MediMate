const express = require('express');
const router = express.Router();
const {
  authGoogleFit,
  googleFitCallback,
  fetchGoogleFitData
} = require('../controllers/googlefit.controller');

const checkauth = require('../middlewares/auth.middleware');

router.get('/auth', checkauth, authGoogleFit);
router.get('/callback', googleFitCallback); // public
router.get('/data', checkauth, fetchGoogleFitData);

module.exports = router;
