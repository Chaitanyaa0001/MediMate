const  jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();
const JWT_SECRET =  process.env.JWT_SECRET;


const checkauth = async (req,res,next) =>{
    try {
        let token ;
        if(req.cookies && req.cookies.token){
            token = req.cookies.token;
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({message:"Unauthorized ! User nor found "})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Token invalid error!",error);
        return res.status(401).json({message : 'token  not valid '})
    }
}
module.exports = checkauth;
