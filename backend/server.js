const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const authorutes = require('./routes/auth.route');
const userroutes = require('./routes/user.route');
const doctorroutes = require('./routes/doctor.route');

const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');



const app =  express();

connectDB();
require("./utils/cloudinary")

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Optional: if using URL-encoded forms


// routes 
app.use('/api/auth', authorutes);
app.use('/api/user',userroutes);
app.use('/api/doctors',doctorroutes);


const PORT = process.env.PORT || 6900;
app.listen( PORT, () =>{
    console.log("Medimate server connected ");
})

