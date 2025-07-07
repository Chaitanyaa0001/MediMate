const express = require("express");
const router = express.Router();
const { generateGeminiResponse } = require("../controllers/geminichat.controller");

// POST /api/chat
router.post("/", generateGeminiResponse);

module.exports = router;
