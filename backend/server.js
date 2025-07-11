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

// Initialize app and DB
const app = express();
connectDB();
require("./utils/cloudinary");

// CORS + Cookie config
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://medi-mate-delta.vercel.app',
  credentials: true,
}));
app.options("*", cors()); // ✅ Handle CORS preflight (important for Google login)

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authorutes);
app.use('/api/user', userroutes);
app.use('/api/doctors', doctorroutes);
app.use('/api/appointments', appointmentsroutes);
app.use('/api/blogs', blogroutes);
app.use('/api/chat', geminiroutes);
app.use('/api/fda', fdaroutes);
app.use('/api/fit', googleFitRoutes);

// Server start
const PORT = process.env.PORT || 6900;
app.listen(PORT, () => {
  console.log(`Medimate server connected on port ${PORT}`);
});
