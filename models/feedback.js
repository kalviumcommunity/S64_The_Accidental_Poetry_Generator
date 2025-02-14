const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  user: String,
  message: String,
  rating: Number,
  dateSubmitted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
