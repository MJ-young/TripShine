// routes/eventRoutes.js
const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

// 为管理员推送实时的游记数目
router.get("/audit/count", eventController.sendTripCounts);
// 对特定用户推送自己发布的游记审核状态改变的消息
router.get("/user/:id", eventController.sendTripStatusChange);

module.exports = router;
