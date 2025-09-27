const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  answer: {
    type: String,
    required: true
  },
  explanation: {
    type: String
  },
  reference: {
    type: String
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  category: {
    type: String,
    enum: ['old_testament', 'new_testament', 'gospels', 'miracles', 'parables', 'general'],
    default: 'general'
  },
  language: {
    type: String,
    default: 'sw'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  timesAsked: {
    type: Number,
    default: 0
  },
  correctAnswers: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);