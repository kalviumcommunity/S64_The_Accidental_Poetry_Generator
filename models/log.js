const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  action: String,
  timestamp: { type: Date, default: Date.now },
  user: String
});

module.exports = mongoose.model('Log', LogSchema);
