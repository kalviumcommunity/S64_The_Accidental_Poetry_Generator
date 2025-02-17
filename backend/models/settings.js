const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  theme: String,
  language: String,
  notifications: Boolean
});

module.exports = mongoose.model('Settings', SettingsSchema);
