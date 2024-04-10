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
    const payload = {
      userId: user._id,
      userRole: user.role, // 假设用户模型中包含角色信息
    };
    // 生成token
    const token = jwt.sign(payload, secretKey, {
      expiresIn: "1h",
    });
    const userInfo = {
      userId: user._id,
      username: user.username,
      role: user.role,
    };
    res.status(200).json({ message: "Login successful", token, userInfo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to login",
    });
  }
};

exports.logoutAdmin = async (req, res) => {
  try {
    // req.session.destroy();
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to logout" });
  }
};

exports.getAllUsers = async (req, res) => {
  const userRole = req.userRole;
  if (userRole !== "super") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  // 分页查询
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  try {
    // 不返回密码字段
    const users = await Admin.find(
      {
        role: "common",
      },
      { password: 0 }
    )
      .skip(skip)
      .limit(limit);
    const total = await Admin.countDocuments();
    if (skip >= total) {
      throw new Error("页码超出范围");
    }
    res.status(200).json({ data: users, total });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const userRole = req.userRole;
  if (userRole !== "super") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const userRole = req.userRole;
  if (userRole !== "super") {
    return res.status(403).json({ message: "Unauthorized" });
  }
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
    return res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const userRole = req.userRole;
  if (userRole !== "super") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  password = "adminadmin";
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    res.status(200).json({ message: "Password reset" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
