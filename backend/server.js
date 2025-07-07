const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const authorutes = require('./routes/auth.route');
const userroutes = require('./routes/user.route');
const doctorroutes = require('./routes/doctor.route');
const appointmentsroutes = require('./routes/appointments.route');
const blogroutes = require('./routes/blog.route');
const geminiroutes = require('./routes/gemini.route')
const fdaroutes = require('./routes/fda.route')

const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');



const app =  express();

connectDB();
require("./utils/cloudinary")

app.use(cookieParser());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Optional: if using URL-encoded forms


// routes 
app.use('/api/auth', authorutes);
app.use('/api/user',userroutes);
app.use('/api/doctors',doctorroutes);   
app.use('/api/appointments',appointmentsroutes);
app.use('/api/blogs',blogroutes);
app.use('/api/chat',geminiroutes);
app.use('/api/fda',fdaroutes);


const PORT = process.env.PORT || 6900;
app.listen( PORT, () =>{
    console.log("Medimate server connected ");
})

