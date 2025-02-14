const express = require('express');
const Word = require('../models/word');
const router = express.Router();

// Create a new Word
router.post('/', async (req, res) => {
  try {
    const word = new Word(req.body);
    await word.save();
    res.status(201).json(word);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Words
router.get('/', async (req, res) => {
  try {
    const words = await Word.find();
    res.status(200).json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single Word by ID
router.get('/:id', async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) return res.status(404).json({ message: 'Word not found' });
    res.status(200).json(word);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Word by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedWord = await Word.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWord) return res.status(404).json({ message: 'Word not found' });
    res.status(200).json(updatedWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Word by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedWord = await Word.findByIdAndDelete(req.params.id);
    if (!deletedWord) return res.status(404).json({ message: 'Word not found' });
    res.status(200).json({ message: 'Word deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
