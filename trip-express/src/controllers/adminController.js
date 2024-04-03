const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/secret");
const bcrypt = require("bcrypt");

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // 生成token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      // expiresIn: "1h",
      // 测试时设置token过期时间为2分钟
      expiresIn: "10m",
    });
    // 设置session
    req.session.user = user;
    const userInfo = {
      userId: user._id,
      username: user.username,
      role: user.role,
    };
    res.status(200).json({ message: "Login successful", token, userInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to login",
    });
  }
};

exports.logoutAdmin = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout" });
  }
};

exports.getAllUsers = async (req, res) => {
  // 分页查询
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  try {
    // const users = await Admin.find();
    // const users = await Admin.find().skip(skip).limit(limit);
    // 不返回密码字段
    const users = await Admin.find({}, { password: 0 }).skip(skip).limit(limit);
    const total = await Admin.countDocuments();
    if (skip >= total) {
      throw new Error("页码超出范围");
    }
    res.status(200).json({ data: users, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  //   如果没有传入密码，则默认密码为adminadmin
  if (!password) {
    password = "adminadmin";
  }

  try {
    // 检查用户名是否已存在
    const exist_user = await Admin.findOne({ username });
    if (exist_user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Admin.create({ username, password: hashedPassword });
    const userInfo = {
      userId: user._id,
      username: user.username,
      role: user.role,
    };
    res.status(201).json({ message: "User created", userInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
