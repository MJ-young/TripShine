const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
