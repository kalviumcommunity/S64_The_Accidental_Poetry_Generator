const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 CREATE New User (Signup)
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user", // Default role is 'user'
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// 📌 GET All Users (Admin Only) - EXCLUDES ADMINS
router.get("/", authenticate, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select("-password"); // ✅ Exclude admins
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch Users Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// 📌 GET a Single User by ID (Protected)
router.get("/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Fetch User Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// 📌 UPDATE User by ID (Protected)
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// 📌 DELETE User by ID (Admin Only)
router.delete("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
