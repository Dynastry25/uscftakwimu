const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Finance = require('../models/Finance');
const Event = require('../models/Event');

// GET reports by type
router.get('/:reportType', async (req, res) => {
  try {
    const { reportType } = req.params;
    const { range } = req.query;

    let data = {};

    switch (reportType) {
      case 'finance':
        data = await generateFinanceReport(range);
        break;
      case 'members':
        data = await generateMembersReport(range);
        break;
      case 'overview':
        data = await generateOverviewReport(range);
        break;
      default:
        data = { message: 'Report type not implemented' };
    }

    res.json(data);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: error.message });
  }
});

// Finance report generator
async function generateFinanceReport(range) {
  const incomeRecords = await Finance.find({ type: 'income' });
  const expenseRecords = await Finance.find({ type: 'expense' });

  const totalIncome = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
  const totalExpenses = expenseRecords.reduce((sum, record) => sum + record.amount, 0);

  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
    monthlyTrend: [] // You can implement monthly aggregation here
  };
}

// Members report generator
async function generateMembersReport(range) {
  const totalMembers = await Member.countDocuments();
  const activeMembers = await Member.countDocuments({ status: 'active' });
  const leadersCount = await Member.countDocuments({ membershipType: 'leader' });

  return {
    totalMembers,
    activeMembers,
    newMembersThisMonth: 5, // You can implement this with date filtering
    membershipGrowth: 12.5,
    departmentBreakdown: [] // You can implement department aggregation
  };
}

// Overview report generator
async function generateOverviewReport(range) {
  return {
    message: 'Overview report data'
  };
}

module.exports = router;