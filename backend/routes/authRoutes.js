const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ensure this model is correct
const { authenticate, isAdmin } = require("../middleware/authMiddleware");// JWT Middleware
require('dotenv').config();

const router = express.Router();

/// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body; // 

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create new user (password is already hashed in User model)
    const newUser = new User({ username, email, password, role: 'user' });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Login Request:", req.body); // Debug input data

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found with email:", email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password Match:", isMatch); // Debug password check

    if (!isMatch) {
      console.log("❌ Password does not match for:", email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Fetch user details (Protected Route)
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("❌ Fetch User Error:", err.message);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

module.exports = router;
