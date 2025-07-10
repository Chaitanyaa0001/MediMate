const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    firstname:{
        type:String,
        required:true

    },
    lastname:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true

    },
    phone:{
        type:Number,
        required:true

    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true

    },
    medicaldegree:{
        type:String,
        required:true

    },
    experienceyear:{
        type:Number,
        required:true

    },
    certificates:{
        type:String,
        required:true

    },
    biography:{
        type:String,
        required:true

    },
    charges:{
        type:Number,
        required:true

    },
    timings:{
        type:String,
        required:true

    }
},{timestamps:true});

module.exports = mongoose.model("DoctorAppointments",doctorSchema);
