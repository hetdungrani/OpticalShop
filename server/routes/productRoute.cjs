const express = require('express');
const router = express.Router();
const Product = require('../models/Product.cjs');
const multer = require('multer');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '_' + file.originalname);
  }
});
const upload = multer({ storage: storage });


// ✅ ACTUAL MISSING ROUTE
router.post('/update/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { pname, size, price, gst, type } = req.body;

  const updateData = { pname, size, price, gst, type };
 if (req.file) {
  updateData.image = req.file.filename; // this includes uploads/ prefix, avoid it
}
  try {
    const updated = await Product.findOneAndUpdate(
  { pid: id },
  updateData,
  { new: true }
);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: updated });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post("/insert", upload.single("filepimage"), async (req, res) => {
  try {
    const { txtpname, sltsize, txtprice, txtgst, sltfrle } = req.body;
    const newProduct = new Product({
      pid: "P" + Date.now(),
      pname: txtpname,
      size: sltsize,
      price: parseFloat(txtprice),
      gst: parseFloat(txtgst),
      type: sltfrle,
      image: req.file?.filename || "",
    });

    await newProduct.save();
    res.status(201).json({ message: "✅ Product inserted successfully!" });
  } catch (err) {
    console.error("❌ Insert Error:", err);
    res.status(500).json({ message: "Server error: Failed to insert product." });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ pid: id });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

router.delete("/delete/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedProduct = await Product.findOneAndDelete({ pid });
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
