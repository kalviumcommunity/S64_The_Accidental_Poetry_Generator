const express = require('express');
const Tag = require('../models/tag');
const router = express.Router();

// Create a new Tag
router.post('/', async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single Tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Tag by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    if (!deletedTag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
