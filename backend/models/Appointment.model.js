const mongoose = require('mongoose');

const patientappointmentschema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patientname: {
        type: String,
        required: true
    },
    email: {                              // ✅ Missing before
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {                               // ✅ Missing before
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', patientappointmentschema);
