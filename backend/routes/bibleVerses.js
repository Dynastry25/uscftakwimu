const express = require('express');
const BibleVerse = require('../models/BibleVerse');
const router = express.Router();

// GET all bible verses
router.get('/', async (req, res) => {
  try {
    const verses = await BibleVerse.find();
    res.json({ verses, total: verses.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE verse
router.post('/', async (req, res) => {
  try {
    const verse = new BibleVerse(req.body);
    await verse.save();
    res.status(201).json(verse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE verse
router.put('/:id', async (req, res) => {
  try {
    const verse = await BibleVerse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!verse) {
      return res.status(404).json({ message: 'Verse not found' });
    }
    res.json(verse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE verse
router.delete('/:id', async (req, res) => {
  try {
    const verse = await BibleVerse.findByIdAndDelete(req.params.id);
    if (!verse) {
      return res.status(404).json({ message: 'Verse not found' });
    }
    res.json({ message: 'Verse deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;