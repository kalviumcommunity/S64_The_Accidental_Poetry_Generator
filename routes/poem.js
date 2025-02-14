const express = require('express');
const Poem = require('../models/poem');
const router = express.Router();

// Create a new Poem
router.post('/', async (req, res) => {
  try {
    const poem = new Poem(req.body);
    await poem.save();
    res.status(201).json(poem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Poems
router.get('/', async (req, res) => {
  try {
    const poems = await Poem.find();
    res.status(200).json(poems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single Poem by ID
router.get('/:id', async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) return res.status(404).json({ message: 'Poem not found' });
    res.status(200).json(poem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Poem by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPoem = await Poem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPoem) return res.status(404).json({ message: 'Poem not found' });
    res.status(200).json(updatedPoem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Poem by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPoem = await Poem.findByIdAndDelete(req.params.id);
    if (!deletedPoem) return res.status(404).json({ message: 'Poem not found' });
    res.status(200).json({ message: 'Poem deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
