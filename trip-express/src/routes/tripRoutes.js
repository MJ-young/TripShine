const express = require("express");
const tripController = require("../controllers/tripController");
const multer = require("multer");
const parseForm = multer().none();
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

// 创建游记
router.post("/", checkAuth, parseForm, tripController.createTrip);
// 更新游记
router.put("/:id", checkAuth, parseForm, tripController.updateTrip); // 使用PUT方法，并通过URL参数传递ID
// 删除游记
router.delete("/:id", checkAuth, tripController.deleteTrip); // 使用DELETE方法，并通过URL参数传递ID
// 获取单个游记详情
router.get("/detail/:id", tripController.getTripDetail); // 通过URL参数传递ID
// 通过标题的关键词搜索游记
router.get("/search", tripController.searchTrip); // 通过query参数传递搜索关键词
// 获取所有游记
router.get("/list", tripController.getAllTrips);

// 获取访问接口的用户某个审核状态的所有游记（需要鉴权）,默认返回全部游记
router.get("/status/:status", checkAuth, tripController.getTripByStatus); // 通过URL参数传递审核状态
// 为游记点赞或取消点赞
// router.post("/like/:id", tripController.likeTrip); // 使用URL参数传递游记ID

// 逻辑删除游记
router.put("/audit/del/:id", checkAuth, tripController.deleteAuditTrip);
// 审核通过游记
router.put("/audit/pass/:id", checkAuth, tripController.passAuditTrip); // 使用PUT方法，并通过URL参数传递ID
// 审核拒绝游记
router.put("/audit/reject/:id", checkAuth, tripController.rejectAuditTrip); // 使用PUT方法，并通过URL参数传递ID
// 获取审核状态的所有游记
router.get(
  "/audit/status/:status",
  checkAuth,
  tripController.getTripByAuditStatus
); // 通过URL参数传递审核状态
// 上传游记图片列表或视频
router.post("/upload", checkAuth, tripController.uploadTripMedia); // 使用POST方法
// 上传一组游记图片
router.post(
  "/upload/images",
  checkAuth,
  tripController.uploadTripMediaMultiple
); // 使用POST方法

module.exports = router;
