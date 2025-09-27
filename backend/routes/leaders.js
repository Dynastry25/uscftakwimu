const express = require('express');
const Leader = require('../models/Leader');
const router = express.Router();

// GET all leaders
router.get('/', async (req, res) => {
  try {
    const leaders = await Leader.find().sort({ order: 1 });
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE leader
router.post('/', async (req, res) => {
  try {
    const leader = new Leader(req.body);
    await leader.save();
    res.status(201).json(leader);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE leader
router.put('/:id', async (req, res) => {
  try {
    const leader = await Leader.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!leader) {
      return res.status(404).json({ message: 'Leader not found' });
    }
    res.json(leader);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE leader
router.delete('/:id', async (req, res) => {
  try {
    const leader = await Leader.findByIdAndDelete(req.params.id);
    if (!leader) {
      return res.status(404).json({ message: 'Leader not found' });
    }
    res.json({ message: 'Leader deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;