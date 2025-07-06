const Appointment = require('../models/Appointment.model');

const bookappointment = async (req, res) => {
  try {
    const patientId = req.user;

    const { doctorId, patientName, email, symptoms, date, time } = req.body;

    if (!patientName || !email || !symptoms || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newBooking = new Appointment({doctorId,patientId,patientName,email,symptoms,date,time,status: 'pending',});

    await newBooking.save();

    return res.status(201).json({ message: "Booked successfully", appointment: newBooking });

  }catch (err) {
    console.error("Booking error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getbookinngsappointment = async (req,res) =>{
    try {
        const doctorId = req.user;
        const appointments = await Appointment.find({doctorId}).sort({createdAt: -1});
        return res.status(200).json({message :"fetched appointments successfully" ,appointments})
    } catch (error) {
        console.error("getbookings error ", error);
        return res.status(500).josn({message :"Internal server error "});
    }
};

module.exports= {getbookinngsappointment,bookappointment}