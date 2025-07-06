const Appointment = require('../models/Appointment.model');

const bookappointment = async (req, res) => {
  try {
    const patientId = req.user._id;

    console.log(req.body);
    
    const { doctorId, patientname, email,symptoms, date, time } = req.body;

    if (!patientname || !email || !symptoms || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newBooking = new Appointment({doctorId,patientId,patientname,email,symptoms,date,time,status: 'pending',});

    await newBooking.save();

    return res.status(201).json({ message: "Booked successfully", appointment: newBooking });

  }catch (err) {
    console.error("Booking error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatestatus = async (req,res) =>{
  try {
    const userId = req.user._id;
    const {appointmentId, status} = req.body;
    if(!['accepted','rejected'].includes(status)){
      return res.status(400).json({message :"Inavlid session"})
    }
    const appointment = await Appointment.findOneAndUpdate(
  { _id: appointmentId, doctorId: userId },
  { status },
  { new: true }
);
    if(!appointment){
      return res.status(404).json({message: "Appointment not found or unauthorized "});
    }

    return res.status(200).json({message:`Appintmernt ${status}`,appointment})

  } catch (err) {
    console.error("Update status error ",err);
    return res.status(500).json({message:"Internal server error "})
  }
}


const getbookinngsappointment = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("REQ.USER:", req.user);
    console.log("Looking for appointments with doctor Id", userId);

    const appointments = await Appointment.find({ doctorId: userId });

    console.log("Appointments found:", appointments.length);
    return res.status(200).json({ message: "Fetched appointments successfully", appointments });
  } catch (error) {
    console.error("getbookings error ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports= {getbookinngsappointment,bookappointment,updatestatus}




