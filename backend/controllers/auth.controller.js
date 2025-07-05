const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const JWT_SECRET = process.env.JWT_SECRET;
const generatetoken = require('../utils/generatetoken');

const signup = async ( req,res) =>{
    const  {username,email,password,confirmpassword,role} = req.body;
    try {
        if(!username || !email || !password || !confirmpassword || !role){
            return res.status(400).json({message: "All Feils Are Required "});
        }
        if(password !== confirmpassword){
            return res.status(400).json({message:"passwords Does not match "});
        }
        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.status(400).json({message :"User Already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt)

        const  newuser = await User.create({
            username,
            email,
            password:hashpassword,
            role
        });
        newuser = await User.findById(newuser._id).select('-password');
        const token = generatetoken(newuser._id,newuser.role);

        res.cookie("token",token,{
            httpOnly:true,
            path:'/',
            secure:true,
            sameSite: "None"
        });
        return res.status(201).json(newuser)


    } catch (error) {
        
    }
}
