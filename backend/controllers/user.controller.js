const User = require('../models/user.model');
const cloudinary = require('../utils/cloudinary');
const bcrypt = require('bcryptjs');

// ✅ Get current user
const getcurrentuser = async (req, res) => {
  try {
    const userId = req.user._id; 
    const user = await User.findById(userId).select('-password');
    return res.status(200).json(user);
  } catch (err) {
    console.error("current user error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Update profile
const updateprofile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {username, email } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password');

    return res.status(200).json({ message: "Profile details updated successfully", updated });
  } catch (err) {
    console.error("update profile error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update password
const updatepassowrd = async (req, res) => {
  try {
    const userId = req.user._id;
    const { oldpassword, newpassword, confirmpassword } = req.body;

    if (!oldpassword || !newpassword || !confirmpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newpassword !== confirmpassword) {
      return res.status(400).json({ message: "New password and confirm password do not match" });
    }

    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(newpassword, salt);
    user.password = hashpassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });

  } catch (err) {
    console.log("Change password error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update profile photo
const updateprofilephoto = async (req, res) => {
  try {

    const userId = req.user._id;
    console.log(req.file);
    console.log("REQ FILE hehe:", req.file)
    console.log("REQ BODY heh:", req.body);
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
      console.log("REQ FILE second :", req.file)
    console.log("REQ BODY: secoond", req.body);

    const updateduser = await User.findByIdAndUpdate(
      userId,
      { profilephoto: req.file.path },
      { new: true }
    ).select('-password');
    console.log("REQ FILE end :", req.file)
    console.log("REQ BODY end :", req.body);

    res.status(200).json({messaeg :"profile photo upates successfuly ",updateduser});
  } catch (error) {
    console.error('Profile photo update error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ✅ Delete user
const deleteuser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    return res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    console.error("Delete user error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getcurrentuser,
  updateprofile,
  updatepassowrd,
  updateprofilephoto,
  deleteuser
};
