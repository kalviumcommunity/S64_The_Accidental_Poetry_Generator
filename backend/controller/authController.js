const User = require("../models/user");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 🔍 Debug: Log incoming request data
    console.log("Signup Request Data:", { username, email, password });

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    console.log("User created successfully:", newUser);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { signup };
