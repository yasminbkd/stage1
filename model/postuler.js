const mongoose = require('mongoose');

const internshipApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  internshipDuration: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  cv: {
    data: Buffer,
    contentType: String,
  },
});

const InternshipApplication = mongoose.model('InternshipApplication', internshipApplicationSchema);

module.exports = InternshipApplication;
