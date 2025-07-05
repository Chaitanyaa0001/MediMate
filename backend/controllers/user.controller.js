const User = require('../models/user.model');
const clodinary = require('../utils/cloudinary');
const bcrypt = require('bcryptjs');

const getcurrentuser =  async (req,res) =>{
    try {
        const userId = req.user;
        const user = await User.findById(userId).select('-password');
        return res.status(200).jsonn(user);
    } catch (err) {
        console.error("current user error ",err);
        return res.status(500).json({message :"Internal Server Error"});
    }
};

const updateprofile = async (req,res) =>{
    try {
       const userId = req.user;
       const {username,email} = req.body;
       const updated = await User.findByIdAndUpdate(userId._id,{username,email},{new:true,runValidators: true}).select('-password');

       return res.status(200).json({message:"Profile details updated succesfully", updated});    
    } catch (err) {
        console.error("update profile error",err);
        return res.status(500).json({message: "Internal server error "});
    }
}

const updatepassowrd = async (req,res) =>{
        const userId = req.user;
        const {currentpassword, newpassword,confirmpassword} = req.body;
    try {
        if(newpassword != confirmpassword){
            return res.status(400).json({message: 'new password and conform password does not match '});
        } 
    } catch (err) {
        
    }
}
