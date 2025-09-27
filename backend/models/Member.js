const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  course: {
    type: String,
    required: true,
    enum: [
      'Bachelor Degree in Official Statistics',
      'Bachelor Degree in Business Statistics and Economics',
      'Bachelor Degree in Agriculture Statistics and Economics',
      'Bachelor Degree in Data Science',
      'Bachelor Degree in Actuarial Statistics',
      'Basic Technician Certificate in Statistics',
      'Basic Technician Certificate in Information Technology',
      'Ordinary Diploma in Statistics',
      'Ordinary Diploma in Information Technology',
      'Nyingine'
    ]
  },
  yearOfStudy: {
    type: String,
    enum: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduated'],
    required: true
  },
  department: {
    type: String,
    enum: ['Kwaya', 'Uinjilisti', 'Maombi', 'IT', 'Nyingine'],
    required: true
  },
  membershipType: {
    type: String,
    enum: ['regular', 'active', 'leader'],
    default: 'regular'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);