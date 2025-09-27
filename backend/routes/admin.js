const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Leader = require('../models/Leader');
const News = require('../models/News');
const Event = require('../models/Event');
const Finance = require('../models/Finance');
const BibleVerse = require('../models/BibleVerse');
const Quiz = require('../models/Quiz');

// GET dashboard stats
router.get('/stats', async (req, res) => {
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
      BibleVerse.countDocuments(),
      Quiz.countDocuments(),
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
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET recent activities
router.get('/activities', async (req, res) => {
  try {
    // Get recent members
    const recentMembers = await Member.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select('name createdAt');
    
    // Get recent financial activities
    const recentFinance = await Finance.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .select('type name amount createdAt');

    const activities = [
      ...recentMembers.map(member => ({
        type: 'member',
        description: `New member registered: ${member.name}`,
        timestamp: member.createdAt
      })),
      ...recentFinance.map(record => ({
        type: 'finance',
        description: `${record.type === 'income' ? 'Income' : 'Expense'} recorded: ${record.name} - TZS ${record.amount.toLocaleString()}`,
        timestamp: record.createdAt
      }))
    ];

    // Sort by timestamp and return latest 5
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json(activities.slice(0, 5));
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;