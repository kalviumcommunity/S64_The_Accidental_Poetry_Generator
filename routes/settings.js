const express = require('express');
const Settings = require('../models/settings');
const router = express.Router();

// Create a new Setting
router.post('/', async (req, res) => {
  try {
    const settings = new Settings(req.body);
    await settings.save();
    res.status(201).json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Settings
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.find();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single Setting by ID
router.get('/:id', async (req, res) => {
  try {
    const setting = await Settings.findById(req.params.id);
    if (!setting) return res.status(404).json({ message: 'Setting not found' });
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Setting by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSetting = await Settings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSetting) return res.status(404).json({ message: 'Setting not found' });
    res.status(200).json(updatedSetting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Setting by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSetting = await Settings.findByIdAndDelete(req.params.id);
    if (!deletedSetting) return res.status(404).json({ message: 'Setting not found' });
    res.status(200).json({ message: 'Setting deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
