const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  logout,
  googleLogin,
  googleCallback
} = require('../controllers/auth.controller');

// 🔐 JWT Auth
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);

// 🌐 Google Auth
router.get('/google', googleLogin); // requires ?role=doctor or ?role=patient
router.get('/google/callback', googleCallback);

module.exports = router;
