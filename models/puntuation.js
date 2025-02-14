const mongoose = require('mongoose');

const PunctuationSchema = new mongoose.Schema({
  type: String, // e.g., period, comma, exclamation mark
  description: String
});

module.exports = mongoose.model('Punctuation', PunctuationSchema);
