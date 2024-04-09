const express = require("express");
const adminController = require("../controllers/adminController");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);

// 超级管理员获取所有用户
router.get("/user", checkAuth, adminController.getAllUsers);
// 超级管理员删除用户
router.delete("/user/:id", checkAuth, adminController.deleteUser);
// 超级管理员新增用户
router.post("/user", checkAuth, adminController.createUser);
// 超级管理员为用户重置密码
router.put("/user/:id", checkAuth, adminController.resetPassword);

module.exports = router;
