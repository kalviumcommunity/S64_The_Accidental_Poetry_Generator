const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Tag', TagSchema);
