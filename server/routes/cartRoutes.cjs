const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart.cjs");

router.post("/add", async (req, res) => {
  const { rid, pid, pname, size, price, gst, type, image } = req.body;

  if (!rid || !pid) return res.status(400).json({ message: "Missing fields" });

  const exists = await Cart.findOne({ rid, pid });
  if (exists) return res.status(400).json({ message: "Already in cart" });

  try {
    const newCart = new Cart({ rid, pid, pname, size, price, gst, type, image });
    const saved = await newCart.save();
    res.status(201).json({ message: "Added to cart" });
  } catch (err) {
    console.error("❌ Add to cart failed:", err);
    res.status(500).json({ message: "Add to cart failed" });
  }
});

router.get("/", async (req, res) => {
  const rid = req.query.rid;

  if (!rid) return res.status(400).json({ error: "Missing cart ID (rid)" });

  try {
    const cartItems = await Cart.find({ rid });
    res.json(cartItems);
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/remove", async (req, res) => {
  const { rid, pid } = req.query;

  if (!rid || !pid) return res.status(400).json({ message: "Missing rid or pid" });

  try {
    const deleted = await Cart.findOneAndDelete({ rid, pid });
    if (!deleted) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("❌ Cart deletion error:", err);
    res.status(500).json({ message: "Failed to delete cart item" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allCarts = await Cart.find();
    res.json(allCarts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all carts" });
  }
});

router.delete("/clear/:rid", async (req, res) => {
  try {
    await Cart.deleteMany({ rid: req.params.rid });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart" });
  }
});
module.exports = router;
