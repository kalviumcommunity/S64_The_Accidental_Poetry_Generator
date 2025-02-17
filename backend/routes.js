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
const categoryRoutes = require('./routes/category'); // Import the category routes

const router = express.Router();

// Register all routes for respective collections with plural names for consistency
router.use('/feedbacks', feedbackRoutes);
router.use('/logs', logRoutes);
router.use('/poems', poemRoutes);
router.use('/punctuations', punctuationRoutes);  // Updated to plural
router.use('/settings', settingsRoutes);
router.use('/tags', tagRoutes);
router.use('/templates', templateRoutes);
router.use('/users', userRoutes);
router.use('/words', wordRoutes);
router.use('/categories', categoryRoutes);  // Register category routes

// Error Handling Middleware for unhandled routes or internal server errors
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server.' });
});

module.exports = router;
