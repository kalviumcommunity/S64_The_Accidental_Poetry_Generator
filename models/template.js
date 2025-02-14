const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  name: String,
  content: String,
  createdBy: String
});

module.exports = mongoose.model('Template', TemplateSchema);
