const express = require('express');
const Joi = require('joi');
const Poem = require('../models/poem');

const router = express.Router();

// 📌 Joi Validation Schemas
const poemSchema = Joi.object({
  text: Joi.string().min(1).required().messages({
    'string.empty': 'Poem text is required',
    'any.required': 'Poem text is required',
  }),
});

const idSchema = Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid Poem ID format',
    'any.required': 'Poem ID is required',
  }),
});

// Middleware for Validation
const validatePoem = (req, res, next) => {
  const { error } = poemSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

const validateId = (req, res, next) => {
  const { error } = idSchema.validate(req.params);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

// 📌 CREATE a New Poem
router.post('/', validatePoem, async (req, res) => {
  try {
    const poem = new Poem({ text: req.body.text });
    await poem.save();
    res.status(201).json({ message: 'Poem created successfully', poem });
  } catch (error) {
    console.error('Error creating poem:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// 📌 READ - Get All Poems
router.get('/', async (req, res) => {
  try {
    const poems = await Poem.find().sort({ createdAt: -1 });
    res.status(200).json(poems);
  } catch (error) {
    console.error('Error fetching poems:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// 📌 READ - Get a Single Poem by ID
router.get('/:id', validateId, async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) return res.status(404).json({ message: 'Poem not found' });

    res.status(200).json(poem);
  } catch (error) {
    console.error(`Error fetching poem with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// 📌 UPDATE - Update Poem by ID
router.put('/:id', validateId, validatePoem, async (req, res) => {
  try {
    const updatedPoem = await Poem.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });

    if (!updatedPoem) return res.status(404).json({ message: 'Poem not found' });

    res.status(200).json({ message: 'Poem updated successfully', updatedPoem });
  } catch (error) {
    console.error(`Error updating poem with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// 📌 DELETE - Delete Poem by ID
router.delete('/:id', validateId, async (req, res) => {
  try {
    const deletedPoem = await Poem.findByIdAndDelete(req.params.id);
    if (!deletedPoem) return res.status(404).json({ message: 'Poem not found' });

    res.status(200).json({ message: 'Poem deleted successfully' });
  } catch (error) {
    console.error(`Error deleting poem with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
