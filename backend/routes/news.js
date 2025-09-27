const express = require('express');
const News = require('../models/News');
const router = express.Router();

// GET all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ publishDate: -1 });
    res.json({ news, total: news.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE news
router.post('/', async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE news
router.put('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE news
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;