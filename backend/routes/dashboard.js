// routes/dashboard.js
const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Leader = require('../models/Leader');
const News = require('../models/News');
const Event = require('../models/Event');
const Finance = require('../models/Finance');

// GET dashboard stats
router.get('/admin/stats', async (req, res) => {
  try {
    const [
      membersCount,
      leadersCount,
      newsCount,
      eventsCount,
      bibleVersesCount,
      quizzesCount,
      incomeRecords,
      expenseRecords
    ] = await Promise.all([
      Member.countDocuments(),
      Leader.countDocuments(),
      News.countDocuments(),
      Event.countDocuments({ status: 'upcoming' }),
      // Add counts for bible verses and quizzes if you have those models
      50, // placeholder for bible verses
      30, // placeholder for quizzes
      Finance.find({ type: 'income' }),
      Finance.find({ type: 'expense' })
    ]);

    const incomeTotal = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
    const expenseTotal = expenseRecords.reduce((sum, record) => sum + record.amount, 0);

    res.json({
      members: membersCount,
      leaders: leadersCount,
      news: newsCount,
      events: eventsCount,
      bibleVerses: bibleVersesCount,
      quizzes: quizzesCount,
      income: incomeTotal,
      expenses: expenseTotal,
      balance: incomeTotal - expenseTotal
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET recent activities
router.get('/admin/activities', async (req, res) => {
  try {
    // This would typically aggregate activities from various models
    const activities = [
      {
        type: 'member',
        description: 'New member registered: John Doe',
        timestamp: new Date()
      },
      {
        type: 'finance',
        description: 'New income recorded: TZS 50,000',
        timestamp: new Date(Date.now() - 86400000)
      }
      // Add more activities as needed
    ];
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;