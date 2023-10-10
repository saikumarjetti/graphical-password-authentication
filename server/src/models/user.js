const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  failedAttempts: Number,
  locked: Boolean,
  lockExpiry: Number,
  imgList: Object,
  imagesList: Object,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
