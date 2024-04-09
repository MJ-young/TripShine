// src/controllers/travelogueController.js
const Trip = require("../models/trip");

exports.sendTripCounts = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const sendCounts = async () => {
    try {
      // 分别统计各个状态的旅行日记数量
      const counts = await Promise.all([
        Trip.countDocuments({ auditStatus: "wait" }),
        Trip.countDocuments({ auditStatus: "pass" }),
        Trip.countDocuments({ auditStatus: "reject" }),
        // 所有旅行日记数量
        Trip.countDocuments(),
      ]);
      const [waiting, passed, rejected, total] = counts;

      // 向客户端发送统计结果
      res.write(
        `data: ${JSON.stringify({ waiting, passed, rejected, total })}\n\n`
      );
    } catch (error) {
      console.error("Failed to fetch Trip counts:", error);
      res.end();
    }
  };

  // 定时发送更新，这里设置为每5秒发送一次
  const intervalId = setInterval(() => {
    sendCounts();
  }, 5000);

  // 当客户端断开连接时清除定时器
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
};

exports.sendTripStatusChange = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // 监听特定用户发布的旅游日记的审核状态变化
  const userId = req.params.id; // 假设用户ID通过查询参数传递
  // 后期通过token解码并写入req，不需要通过查询参数传递
  const pipeline = [
    { $match: { "fullDocument.userId": userId, operationType: "update" } },
  ];

  const changeStream = Trip.watch(pipeline, { fullDocument: "updateLookup" });
  changeStream.on("change", (change) => {
    const updatedDocument = change.fullDocument;
    if (updatedDocument) {
      res.write(`data: ${JSON.stringify(updatedDocument)}\n\n`);
    }
  });

  req.on("close", () => {
    changeStream.close();
    res.end();
  });
};
