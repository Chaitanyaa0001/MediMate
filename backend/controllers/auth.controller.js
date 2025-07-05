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
        const existinguser = await User.findOne({email,role});
        if(existinguser){
            return res.status(400).json({message :"User Already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt)

        let  newuser = await User.create({
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
        return res.status(201).json(newuser);
    } catch (error) {
        console.log("signupfailed" ,error);
        return res.status(500).json({message: "Internal Server Error "})
    }
};

const signin = async (req,res) =>{
    const {email,password,role} = req.body;
    try {
        if(!email || !password || !role){
            return res.status(400).json({message: "All Feilds Are Required !!"})
        };
        const existinguser = await User.findOne({email,role})
        if(!existinguser){
            return res.status(404).json({message:"User Does not exist !"})
        }
        const ismatch = await bcrypt.compare(password,existinguser.password)
        if(!ismatch){
            return res.status(400).json({message : "Invalid Username Or Password "})
        }
        const loggedinuser = await User.findById(existinguser._id).select('-password')
        const token = generatetoken(loggedinuser._id,loggedinuser.role);
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "None",
            path: '/'
        });
        return res.status(201).json(loggedinuser);

    } catch (error) {
        console.error("signin error in server",error);
        return res.status(500).json({message :"Internal Server Error"});
    }
} 

const  logout = (req,res) =>{

    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/"
        });
        
        return res.status(200).json({message:"Logout successfuly "})
    } catch (error) {
        console.error("logout error", error);
        return res.status(500).json({message : "Internal server Error "})
    }

}
module.exports  = {signup,signin,logout}
