const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures that category names are unique
    trim: true,
    minlength: 3, // Minimum length for category name
    maxlength: 100, // Maximum length for category name
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5, // Minimum length for category description
    maxlength: 500, // Maximum length for category description
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time when the category is created
  },
});

// Create the Category model from the schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
