const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phonenumber: String,
  reasonforcontact: String,
  message: String,
  submitted_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
