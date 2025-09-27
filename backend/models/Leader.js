const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    enum: ['executive', 'spiritual', 'academic', 'mission', 'finance', 'media'],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  contact: {
    type: String
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  office: {
    type: String
  },
  responsibilities: [{
    type: String
  }],
  tenure: {
    type: String
  },
  isExecutive: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Leader', leaderSchema);