const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/getInfo", userController.getUserInfo);
// 上传用户头像
router.post("/upload/avatar", userController.uploadAvatar);
// 更新用户信息
router.put("/update", userController.updateUserInfo);

module.exports = router;
