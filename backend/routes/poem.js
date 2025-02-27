const express = require('express');
const Poem = require('../models/poem');
const router = express.Router();

// Create a new Poem
router.post('/', async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({ message: 'Poem text is required' });
    }

    const poem = new Poem(req.body);
    await poem.save();
    res.status(201).json({ message: 'Poem created successfully', poem });
  } catch (error) {
    console.error('Error creating poem:', error);
    res.status(500).json({ message: 'Failed to create poem', error: error.message });
  }
});

// Get all Poems
router.get('/', async (req, res) => {
  try {
    const poems = await Poem.find().sort({ createdAt: -1 }); // Latest poems first
    res.status(200).json(poems);
  } catch (error) {
    console.error('Error fetching poems:', error);
    res.status(500).json({ message: 'Failed to fetch poems', error: error.message });
  }
});

// Get a single Poem by ID
router.get('/:id', async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) return res.status(404).json({ message: 'Poem not found' });
    res.status(200).json(poem);
  } catch (error) {
    console.error(`Error fetching poem with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to fetch poem', error: error.message });
  }
});

// Update Poem by ID
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({ message: 'Poem text is required for update' });
    }

    const updatedPoem = await Poem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPoem) return res.status(404).json({ message: 'Poem not found' });

    res.status(200).json({ message: 'Poem updated successfully', updatedPoem });
  } catch (error) {
    console.error(`Error updating poem with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to update poem', error: error.message });
  }
});

// Delete Poem by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPoem = await Poem.findByIdAndDelete(req.params.id);
    if (!deletedPoem) return res.status(404).json({ message: 'Poem not found' });

    res.status(200).json({ message: 'Poem deleted successfully' });
  } catch (error) {
    console.error(`Error deleting poem with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to delete poem', error: error.message });
  }
});



module.exports = router;
