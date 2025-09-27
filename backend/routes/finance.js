const express = require('express');
const Finance = require('../models/Finance');
const router = express.Router();

// GET all finance records
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const records = await Finance.find(query).sort({ date: -1 });
    res.json({ records, total: records.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET finance summary
router.get('/summary', async (req, res) => {
  try {
    const monthlyTrend = await Finance.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' }
          },
          income: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0]
            }
          },
          expenses: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0]
            }
          }
        }
      },
      { 
        $sort: { '_id.year': 1, '_id.month': 1 } 
      }
    ]);

    res.json({ monthlyTrend });
  } catch (error) {
    console.error('Error fetching finance summary:', error);
    res.status(500).json({ message: error.message });
  }
});

// CREATE finance record
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { type, date, name, paymentMethod, amount, event, reason } = req.body;
    
    if (!type || !date || !name || !paymentMethod || !amount || !event || !reason) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const record = new Finance({
      ...req.body,
      amount: parseFloat(amount),
      transactionFee: parseFloat(req.body.transactionFee || 0),
      recordedBy: 'Admin' // Default value
    });
    
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE finance record
router.put('/:id', async (req, res) => {
  try {
    const record = await Finance.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        amount: parseFloat(req.body.amount),
        transactionFee: parseFloat(req.body.transactionFee || 0)
      },
      { new: true, runValidators: true }
    );
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE finance record
router.delete('/:id', async (req, res) => {
  try {
    const record = await Finance.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;