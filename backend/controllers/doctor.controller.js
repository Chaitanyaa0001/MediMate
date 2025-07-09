const DoctorAppointments = require('../models/doctor.model');
const mongoose = require('mongoose');


const getalldoctors = async (req, res) => {
  try {
    const doctors = await DoctorAppointments.find().select('-__v');
    return res.status(200).json(doctors);
  } catch (error) {
    console.error("fetching doctors error:", error);
    return res.status(500).json({ message: "internal server error" });
  }
};



const postdoctor = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("Received body:", req.body);
    console.log("User ID from auth middleware:", req.user);

    const {
      firstname, lastname, email, phone, dob,
      gender, medicaldegree, experienceyear,
      certificates, biography, charges, timings
    } = req.body;

    console.log("before1");
    

    const requiredFields = [
      'firstname', 'lastname', 'email', 'phone', 'dob', 'gender',
      'medicaldegree', 'experienceyear', 'certificates', 'biography',
      'charges', 'timings'
    ];

    console.log('after require');
    
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null) {
            console.log(`❌ Missing or empty field: "${field}" -> Value:`, req.body[field]);

        return res.status(400).json({ message: `${field} is required` });
      }
    }
    console.log("after loop ");
    

    const existingdoctor = await DoctorAppointments.findOne({ userId});
    if (existingdoctor) {
      return res.status(400).json({ message: "Doctor already registered" });
    }

    console.log("Creating doctor with data:", {
      userId,
      firstname,
      lastname,
      email,
      phone,
      dob,
      gender,
      medicaldegree,
      experienceyear,
      certificates,
      biography,
      charges,
      timings
    });

    const postedDoctor = await DoctorAppointments.create({
      userId,
      firstname,
      lastname,
      email,
      phone,
      dob,
      gender,
      medicaldegree,
      experienceyear,
      certificates,
      biography,
      charges,
      timings
    });

    return res.status(200).json({ message: "Doctor registered", postedDoctor });
  } catch (error) {
    console.error("register doctor error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { postdoctor };


module.exports = { getalldoctors, postdoctor };
