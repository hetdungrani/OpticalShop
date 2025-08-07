const express = require("express");
const router = express.Router();
const Order = require("../models/Order.cjs");

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      pno,
      pincode,
      address,
      cartItems,
      quantities,
      totalAmount,
    } = req.body;

    const newOrder = new Order({
      name,
      email,
      pno,
      pincode,
      address,
      cartItems,
      quantities,
      totalAmount,
    });

    res.status(200).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("❌ Error saving order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
