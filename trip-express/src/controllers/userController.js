const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/secret");
const upload = require("../utils/upload");
const multer = require("multer");

// 配置multer，使用.parseForm()表示不处理文件上传，只处理文本字段
const parseForm = multer().none();

exports.registerUser = async (req, res) => {
  try {
    parseForm(req, res, async () => {
      const { username, password } = req.body;
      // 检查用户名是否已存在
      const existing = await User.findOne({ username });
      if (existing) {
        return res.status(409).json({
          message: "User already exists",
        });
      }
      // 对密码进行加密
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.status(200).json({
        message: "User registered successfully",
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    parseForm(req, res, async () => {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
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
        userRole: "user", // 假设用户模型中包含角色信息
      };
      // 生成token
      const token = jwt.sign(payload, secretKey, {
        // 测试时设置token过期时间为2分钟
        expiresIn: "24h",
      });
      res.status(200).json({ message: "Login successful", token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to login",
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    // req.session.destroy();
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout" });
  }
};

exports.getUserInfo = async (req, res) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res
    .status(200)
    .json({ data: { user }, message: "User info fetched successfully" });
};

// 上传用户头像
exports.uploadAvatar = async (req, res) => {
  try {
    const userId = req.userId;
    // 文件字段名假设为'avatar'
    upload.single("avatar")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // 发生错误
        return res.status(500).json({ message: err.message });
      } else if (err) {
        // 发生未知错误
        return res.status(500).json({ message: "文件上传失败" });
      }
      // 上传成功，req.file 包含了文件的信息
      const file = req.file;
      console.log(file);
      // 将数据库中的用户头像字段更新为上传的文件url
      await User.findByIdAndUpdate(userId, { avatar: file.url });

      res.status(200).json({ url: file.url, message: "上传成功" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserInfo = async (req, res) => {
  // const user = req.session.user;
  // if (!user) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }
  // const { username, password } = req.body;
  // try {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   await User.findByIdAndUpdate(user._id, { username, password: hashedPassword });
  //   res.status(200).json({ message: "User info updated successfully" });
  // } catch (error) {
  //   res.status(500).json({ message: "Failed to update user info" });
  // }
  res.status(200).json({ message: "接口正在开发" });
};
