const mongoose = require('mongoose');


const connectDB = async () =>{
    try {
        await  mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDb connected");
    } catch (err) {
        console.log(err,"mongo db error ");
    }
}

module.exports = connectDB;
