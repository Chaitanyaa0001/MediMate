const mongoose = require('mongoose');

const blogschema = new mongoose.Schema({
    title:{
        type:String,
        required: true 
    },
    summary:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    date:{
        type:String,
        default: () => new Date().toISOString().split('T')[0]
    }
},{timestamps:true});

module.exports = mongoose.model('Blog',blogschema);

