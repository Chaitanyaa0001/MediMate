const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['doctor', 'patient']
    },
    profilephoto:{
        type:String,
    },
   
},{timestamps:true});

Userschema.index({email: 1,role :1}, {unique:true});

module.exports = mongoose.model('User',Userschema);