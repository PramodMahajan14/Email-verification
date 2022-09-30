const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: [true, "please enter userid!"],
    trim: true,
    unique: true,
  },

  mobileNo: {
    type: Number,
    default: "1234567890",
    trim: true,
  },

  email: {
    type: String,
    required: [true, "please enter userid!"],
    trim: true,
    unique: true,
  },
});
module.exports = mongoose.model("user", userSchema);
