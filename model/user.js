const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  userAttributes: {
    firstName: { type: String },
    lastName: { type: String },
    companyName: { type: String },
    address: { type: String },
  },
});

module.exports = mongoose.model('User', userSchema);
