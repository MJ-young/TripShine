const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/secret");
const upload = require("../middlewares/upload");
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
      const savedUser = await newUser.save({ new: true });
      // 生成token
      const payload = {
        userId: savedUser._id,
        userRole: "user", // 假设用户模型中包含角色信息
      };
      const token = jwt.sign(payload, secretKey, {
        // 测试时设置token过期时间
        expiresIn: "4h",
      });
      const userInfo = {
        userId: savedUser._id,
        username: savedUser.username,
        avatar: savedUser.avatar,
      };
      res.status(200).json({
        message: "User registered successfully",
        userInfo,
        token,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to register user" });
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
        expiresIn: "4h",
      });
      const userInfo = {
        userId: user._id,
        username: user.username,
        avatar: user.avatar,
      };
      res.status(200).json({ message: "Login successful", token, userInfo });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to login",
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    // req.session.destroy();
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to logout" });
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
    upload.single("avatar")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error("文件上传失败multer:", err);
        return res.status(500).json({ message: err.message });
      } else if (err) {
        console.error("文件上传失败:", err);
        return res.status(500).json({ message: "文件上传失败" });
      }
      const userId = req.userId;
      const file = req.file;
      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { avatar: file.url },
          { new: true }
        );
        if (!updatedUser) {
          console.log("未找到用户或更新失败");
          return res.status(404).json({ message: "未找到用户或更新失败" });
        }
        console.log("数据库更新成功");
        res.status(200).json({ url: file.url, message: "上传成功" });
      } catch (updateError) {
        console.error("更新用户头像时出错:", updateError);
        return res.status(500).json({ message: "更新数据库时出错" });
      }
    });
  } catch (error) {
    console.error("上传头像时出错:", error);
    return res.status(500).json({ message: error.message });
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
  return res.status(200).json({ message: "接口正在开发" });
};
