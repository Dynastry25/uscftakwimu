const mongoose = require('mongoose');

const bibleVerseSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  version: {
    type: String,
    default: 'NENO'
  },
  category: {
    type: String,
    enum: ['love', 'faith', 'hope', 'encouragement', 'wisdom', 'general'],
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
  usedCount: {
    type: Number,
    default: 0
  },
  lastUsed: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BibleVerse', bibleVerseSchema);