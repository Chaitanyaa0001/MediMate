const express = require("express");
const router = express.Router();
const { generateGeminiResponse } = require("../controllers/geminichat.controller");
const checkauth = require('../middlewares/auth.middleware');

// POST /api/chat
router.post("/",checkauth,generateGeminiResponse);

module.exports = router;
