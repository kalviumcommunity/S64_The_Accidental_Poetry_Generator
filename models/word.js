const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: String,
  partOfSpeech: String, // e.g., noun, verb
  definition: String
});

module.exports = mongoose.model('Word', WordSchema);
