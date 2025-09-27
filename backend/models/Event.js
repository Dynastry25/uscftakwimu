const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['regular', 'special', 'conference', 'retreat', 'workshop', 'mission'],
    default: 'regular'
  },
  image: {
    type: String
  },
  registrationRequired: {
    type: Boolean,
    default: false
  },
  maxAttendees: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  organizer: {
    type: String,
    required: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }],
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

// Virtual for event duration in days
eventSchema.virtual('duration').get(function() {
  const diffTime = Math.abs(this.endDate - this.startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model('Event', eventSchema);