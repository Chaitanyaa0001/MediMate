const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authorutes = require('./routes/auth.route');
const userroutes = require('./routes/user.route');
const doctorroutes = require('./routes/doctor.route');
const appointmentsroutes = require('./routes/appointments.route');
const blogroutes = require('./routes/blog.route');
const geminiroutes = require('./routes/gemini.route');
const fdaroutes = require('./routes/fda.route');
const googleFitRoutes = require('./routes/googlefit.route');
const connectDB = require('./config/database');

// Connect to MongoDB
connectDB();
require("./utils/cloudinary");

const app = express();

// --- Middleware ---

app.use(cookieParser());

// ✅ CORS setup
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://medi-mate-delta.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed from this origin: " + origin));
    }
  },
  credentials: true,
}));

app.options("*", cors()); // Preflight requests

// ✅ Set custom security headers (Google login + embedder-friendly)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use('/api/auth', authorutes);
app.use('/api/user', userroutes);
app.use('/api/doctors', doctorroutes);
app.use('/api/appointments', appointmentsroutes);
app.use('/api/blogs', blogroutes);
app.use('/api/chat', geminiroutes);
app.use('/api/fda', fdaroutes);
app.use('/api/fit', googleFitRoutes);

// --- Start Server ---
const PORT = process.env.PORT || 6900;
app.listen(PORT, () => {
  console.log(`✅ Medimate server running on port ${PORT}`);
});
