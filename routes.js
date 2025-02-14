const express = require('express');
const feedbackRoutes = require('./routes/feedback');
const logRoutes = require('./routes/log');
const poemRoutes = require('./routes/poem');
const punctuationRoutes = require('./routes/punctuation');
const settingsRoutes = require('./routes/settings');
const tagRoutes = require('./routes/tag');
const templateRoutes = require('./routes/template');
const userRoutes = require('./routes/user');
const wordRoutes = require('./routes/word');
const categoryRoutes = require('./routes/category');  // Import the category routes

const router = express.Router();

// Register all routes for respective collections
router.use('/feedback', feedbackRoutes);
router.use('/logs', logRoutes);
router.use('/poems', poemRoutes);
router.use('/punctuation', punctuationRoutes);
router.use('/settings', settingsRoutes);
router.use('/tags', tagRoutes);
router.use('/templates', templateRoutes);
router.use('/users', userRoutes);
router.use('/words', wordRoutes);
router.use('/categories', categoryRoutes);  // Register category routes

module.exports = router;
