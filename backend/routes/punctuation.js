const express = require('express');
const Punctuation = require('../models/puntuation');
const router = express.Router();

// Create a new Punctuation
router.post('/', async (req, res) => {
  try {
    const punctuation = new Punctuation(req.body);
    await punctuation.save();
    res.status(201).json(punctuation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Punctuations
router.get('/', async (req, res) => {
  try {
    const punctuations = await Punctuation.find();
    res.status(200).json(punctuations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single Punctuation by ID
router.get('/:id', async (req, res) => {
  try {
    const punctuation = await Punctuation.findById(req.params.id);
    if (!punctuation) return res.status(404).json({ message: 'Punctuation not found' });
    res.status(200).json(punctuation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Punctuation by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPunctuation = await Punctuation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPunctuation) return res.status(404).json({ message: 'Punctuation not found' });
    res.status(200).json(updatedPunctuation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Punctuation by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPunctuation = await Punctuation.findByIdAndDelete(req.params.id);
    if (!deletedPunctuation) return res.status(404).json({ message: 'Punctuation not found' });
    res.status(200).json({ message: 'Punctuation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
