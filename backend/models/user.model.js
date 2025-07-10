const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return this.provider !== 'google';
    },
  },
  role: {
    type: String,
    required: true,
    enum: ['doctor', 'patient'],
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  profilephoto: {
    type: String,
  },
}, { timestamps: true });

// Prevent duplicate users with same email + role
Userschema.index({ email: 1, role: 1 }, { unique: true });

module.exports = mongoose.model('User', Userschema);
