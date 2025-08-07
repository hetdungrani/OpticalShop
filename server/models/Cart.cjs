const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  rid: String,
  pid: String,
  pname: String,
  size: String,
  price: Number,
  gst: Number,
  type: String,
  image: String,
});

module.exports = mongoose.model("Cart", cartSchema);
