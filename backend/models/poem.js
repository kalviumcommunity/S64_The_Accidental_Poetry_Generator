const mongoose = require('mongoose');

const PoemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Poem', PoemSchema);
