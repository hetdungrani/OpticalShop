const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pid: String,
  pname: String,
  size: String,
  price: Number,
  gst: Number,
  type: String,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);
