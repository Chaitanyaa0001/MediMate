const DoctorAppointments = require('../models/doctor.model');


const getalldoctors = async(req,res) =>{
    try {
        // const userId = req.user;
        const doctors = await DoctorAppointments.find().select("-__v");
        return res.status(200).json(doctors);
    } catch (error) {
        console.error("fetching doectors error");
        return res.status(500).json({message:"internal server error"})        
    }
}

const postdoctor = async (req,res) =>{
    try {
        const userId = req.user._id;
        const {firstname,lastname,email,phone,dob,gender,medicaldegree,experienceyear,medicalschool,certificates,biography,charges,timings} = req.body;

        if( !firstname || !lastname || !email || !phone || !dob || !gender || !medicaldegree || !experienceyear || !medicalschool || !certificates || !biography || !charges || !timings){
            return res.status(400).json({message : "all feilds are required "})
        }
        const existingdoctor = await DoctorAppointments.findOne({ userId });
        if(existingdoctor){
            return res.status(400).json({message :"Doctor with these details already exists"});
        }

        const postedDoctor = await  DoctorAppointments.create({
            userId,firstname,lastname,email,phone,dob,gender,medicaldegree,experienceyear,medicalschool,certificates,biography,charges,timings
        })
        return res.status(200).json({ message :"posted doctor",postedDoctor});
    } catch (error) {
        console.error("register doctor error ",error);
        return res.status(500).json({message :"Internak Server Error "})
    }
}

module.exports ={getalldoctors,postdoctor}