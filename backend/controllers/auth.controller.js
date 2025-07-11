const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const generatetoken = require('../utils/generatetoken');

const signup = async (req, res) => {
  const { username, email, password, confirmpassword, role } = req.body;
  try {
    if (!username || !email || !password || !confirmpassword || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existinguser = await User.findOne({ email, role });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    let newuser = await User.create({
      username,
      email,
      password: hashpassword,
      role,
      authType: 'manual'
    });

    newuser = await User.findById(newuser._id).select('-password');

    const token = generatetoken(newuser._id, newuser.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: '/'
    });

    return res.status(201).json(newuser);
  } catch (error) {
    console.log("Signup failed:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signin = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (existinguser.role !== role) {
      return res.status(403).json({
        message: `This email is registered as a ${existinguser.role}. Please select the correct role.`,
      });
    }

    if (existinguser.authType !== 'manual') {
      return res.status(403).json({
        message: `This account was created using Google. Please sign in with Google.`,
      });
    }

    const isMatch = await bcrypt.compare(password, existinguser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const loggedinuser = await User.findById(existinguser._id).select('-password');
    const token = generatetoken(loggedinuser._id, loggedinuser.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: '/'
    });

    return res.status(201).json({ user: loggedinuser, token });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/"
    });
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { email, username, profilePhoto, role } = req.body;

    if (!email || !username || !profilePhoto || !role) {
      return res.status(400).json({ message: "Missing Google user info or role" });
    }

    let user = await User.findOne({ email, role });

    if (!user) {
      user = await User.create({
        username,
        email,
        role,
        profilephoto: profilePhoto,
        authType: 'google',
        password: null
      });
    } else if (user.authType !== 'google') {
      return res.status(403).json({
        message: `This account was created using another method. Please login with email & password.`
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '7d'
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    console.error('Google Login Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signup, signin, logout, googleLogin };
