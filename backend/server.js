const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const authorutes = require('./routes/auth.route')

const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');



const app =  express();

connectDB();
require("./utils/cloudinary")

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authorutes);




const PORT = process.env.PORT || 6900;
app.listen( PORT, () =>{
    console.log("Medimate server connected ");
})

