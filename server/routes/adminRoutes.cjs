const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin.cjs");
const User = require("../models/User.cjs");
const Product = require("../models/Product.cjs");

const Order =
  require("mongoose").models.Order ||
  require("mongoose").model("Order", new require("mongoose").Schema({}));

router.get("/dashboard-summary", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalAdmins = await Admin.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.json({
      totalUsers,
      totalProducts,
      totalAdmins,
      totalOrders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/register", async (req, res) => {
  const { username, address, phone, email, password, cpassword } = req.body;

  if (!username || !address || !phone || !email || !password || !cpassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== cpassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  if (!/^[a-zA-Z ]*$/.test(username)) {
    return res.status(400).json({ message: "Invalid username format." });
  }

  try {
    const newAdmin = new Admin({ username, address, phone, email, password });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering admin." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Both fields are required." });
  }

  try {
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    res.status(200).json({ message: "Login successful.", email: admin.email });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
