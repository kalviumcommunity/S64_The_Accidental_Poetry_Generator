const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // You might want to hash this in production
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
