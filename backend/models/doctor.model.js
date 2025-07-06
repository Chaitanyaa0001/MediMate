const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    gender:{
        type:String
    },
    medicaldegree:{
        type:String
    },
    experienceyear:{
        type:String
    },
    medicalschool:{
        type:String
    },
    certificates:{
        type:String
    },
    biography:{
        type:String
    },
    charges:{
        type:String
    },
    timings:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model("DoctorAppointments",doctorSchema);
