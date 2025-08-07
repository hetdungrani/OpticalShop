const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./dbConnection/db.cjs");

const app = express();
const PORT = 5000;

// Ensure upload folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
connectDB();

// Routes
app.use("/api/contact", require("./routes/contactRoute.cjs"));
app.use("/api/products", require("./routes/productRoute.cjs"));
app.use("/api/auth", require("./routes/authRoutes.cjs"));
app.use("/api/admin", require("./routes/adminRoutes.cjs"));
app.use("/api/cart", require("./routes/cartRoutes.cjs"));
app.use("/api/users", require("./routes/userRoutes.cjs"));
app.use("/api/bill", require("./routes/billRoutes.cjs")); 

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Runtime error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
