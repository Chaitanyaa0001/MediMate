const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
      return this.authType !== 'google';
    },
  },
  role: {
    type: String,
    required: true,
    enum: ['doctor', 'patient'],
  },
  authType: {
    type: String,
    enum: ['manual', 'google'],
    default: 'manual',
  },
  profilephoto: {
    type: String,
  },
}, { timestamps: true });

UserSchema.index({ email: 1, role: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
