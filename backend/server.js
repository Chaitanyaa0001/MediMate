const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const connectDB = require('./config/database');



const app =  express();

connectDB();

app.use(cors());
app.use(express.json());




const PORT = process.env.PORT || 6900;
app.listen( PORT, () =>{
    console.log("Medimate server connected ");
})

