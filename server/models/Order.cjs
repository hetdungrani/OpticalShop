const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  rid: String,
  pid: String,
  pname: String,
  size: String,
  price: Number,
  gst: Number,
  type: String,
  image: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  pno: String,
  pincode: String,
  address: String,
  cartItems: [cartItemSchema],
  quantities: [Number],
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
