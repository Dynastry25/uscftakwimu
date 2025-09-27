const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dynastrytv:Dynastry2003@cluster0.wlkvf5s.mongodb.net/uscf_database?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');
const leaderRoutes = require('./routes/leaders');
const newsRoutes = require('./routes/news');
const eventRoutes = require('./routes/events');
const bibleVerseRoutes = require('./routes/bibleVerses');
const quizRoutes = require('./routes/quizzes');
const financeRoutes = require('./routes/finance');
const mediaRoutes = require('./routes/media');
const adminRoutes = require('./routes/admin');
const reportRoutes = require('./routes/reports');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/leaders', leaderRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bible-verses', bibleVerseRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend API is working!',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});