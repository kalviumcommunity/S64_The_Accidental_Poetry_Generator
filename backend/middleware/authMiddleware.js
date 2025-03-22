const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Remove "Bearer " prefix if present
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user details from the database
    const user = await User.findById(decoded.id).select('-password'); // Exclude password

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user; // Attach user info to request
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.status(401).json({ message: 'Unauthorized: Invalid or Expired Token' });
  }
};

module.exports = authenticate;
