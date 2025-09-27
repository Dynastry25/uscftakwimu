const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['events', 'missions', 'graduation', 'prayer', 'announcements', 'general'],
    default: 'general'
  },
  tags: [{
    type: String
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  publishDate: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Auto-generate excerpt if not provided
newsSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150) + '...';
  }
  next();
});

module.exports = mongoose.model('News', newsSchema);