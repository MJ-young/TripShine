const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  //   管理员角色：common-普通管理员，super-超级管理员
  role: { type: String, default: "common" },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
