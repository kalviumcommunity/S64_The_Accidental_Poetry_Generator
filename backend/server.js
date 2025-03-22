require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json()); // Parse JSON body
app.use(helmet()); // Basic security headers

// ✅ Fix: Proper CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend access
    credentials: true, // Allow cookies & auth headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use("/api", routes); // Centralized API Routes

// ✅ Health Check Route
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Pong! Server is running smoothly 🚀" });
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
