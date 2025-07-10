const mongoose = require('mongoose');

const googlefitschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    acccess_token:{
        type:String
    },
    refresh_token:{
        type:String
    },
    scope:{
        type:String
    },
    token_type:{
        type:String
    },
    expiry:{
        type:Number
    }
})
module.exports =  mongoose.model('GoogleFit', googlefitschema)