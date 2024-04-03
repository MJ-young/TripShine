const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);

// 超级管理员获取所有用户
router.get("/user", adminController.getAllUsers);
// 超级管理员删除用户
router.delete("/user/:id", adminController.deleteUser);
// 超级管理员新增用户
router.post("/user", adminController.createUser);

module.exports = router;
