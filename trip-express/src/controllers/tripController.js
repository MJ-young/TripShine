const Trip = require("../models/trip");

// 创建游记
exports.createTrip = async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json({ data: savedTrip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 获取所有游记
exports.getAllTrips = async (req, res) => {
  try {
    // 获取所有状态为审核通过的游记
    const trips = await Trip.find({ auditStatus: "pass", isDeleted: false });
    // 后续需要考虑对于移动端返回的数据进行分页处理
    res.status(200).json({ data: trips });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 获取单个游记详情
exports.getTripDetail = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip) {
      res.status(200).json({ data: trip });
    } else {
      res.status(404).json({ message: "游记未找到" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 更新游记
exports.updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ data: updatedTrip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 物理删除游记
exports.deleteTrip = async (req, res) => {
  // 后续需要校验用户是否有权限删除游记
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "游记已删除" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 通过关键词搜索游记
exports.searchTrip = async (req, res) => {
  try {
    // 使用正则表达式进行模糊搜索,搜索标题中包含关键词的游记
    const titleTrips = await Trip.find({
      title: { $regex: req.query.keyword },
      auditStatus: "pass",
      isDeleted: false,
    });
    // 获取用户名中包含关键词用户及其游记列表
    const userTrips = await Trip.find({
      username: { $regex: req.query.keyword },
      auditStatus: "pass",
      isDeleted: false,
    });
    // 整理返回的数据，去重
    const trips = [...titleTrips, ...userTrips];
    res.status(200).json({ data: trips });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // 获取某个用户的所有已审核通过游记
// exports.getTripByUser = async (req, res) => {
//   try {
//     const trips = await Trip.find({
//       userId: req.params.userId,
//       status: "pass",
//     });
//     res.status(200).json(trips);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// 获取访问接口的用户某个审核状态的所有游记（需要鉴权）
exports.getTripByStatus = async (req, res) => {
  // 后续不需要传入用户ID，因为已经通过token鉴权获取到用户信息
  try {
    // 如果status为空，则返回所有游记
    const trips = await Trip.find({
      userId: req.query.userId,
      //   如果status为all，则返回所有游记,否则返回指定状态的游记
      auditStatus:
        req.params.status === "all" ? { $ne: null } : req.params.status,
      isDeleted: false,
    });
    res.status(200).json({ data: trips });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 逻辑删除游记
exports.deleteAuditTrip = async (req, res) => {
  try {
    await Trip.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
      deleteReason: req.query.deleteReason,
    });
    res.status(200).json({ message: "游记已删除" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 审核通过
exports.passAuditTrip = async (req, res) => {
  try {
    await Trip.findByIdAndUpdate(req.params.id, {
      auditStatus: "pass",
      auditTime: Date.now(),
      auditor: req.query.userId,
    });
    res.status(200).json({ message: "审核通过" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 审核拒绝
exports.rejectAuditTrip = async (req, res) => {
  try {
    await Trip.findByIdAndUpdate(req.params.id, {
      auditStatus: "reject",
      auditTime: Date.now(),
      auditor: req.query.userId,
    });
    res.status(200).json({ message: "拒绝通过" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 获取审核状态的所有游记
exports.getTripByAuditStatus = async (req, res) => {
  // 后续需要校验管理员身份
  try {
    const trips = await Trip.find({
      // 如果status为all，则返回所有游记,否则返回指定状态的游记
      auditStatus:
        req.params.status === "all" ? { $ne: null } : req.params.status,
      isDeleted: false,
    });
    res.status(200).json({ data: trips });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
