const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default:
      "http://tripshine.oss-cn-shanghai.aliyuncs.com/public/images/8ea864552b199085f746839df5e16428.png",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
