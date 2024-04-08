const Trip = require("../models/trip");
const upload = require("../utils/upload");
const multer = require("multer");
const { deleteFilesFromOSS } = require("../utils/ossService");
const parseForm = multer().none();

// 创建游记
exports.createTrip = async (req, res) => {
  try {
    // 使用multer的.none方法处理表单数据
    parseForm(req, res, async () => {
      const newTrip = new Trip(req.body);
      const savedTrip = await newTrip.save();
      res.status(201).json({ data: savedTrip });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 获取所有游记
exports.getAllTrips = async (req, res) => {
  try {
    // 获取所有状态为审核通过的游记
    // const trips = await Trip.find({ auditStatus: "pass", isDeleted: false });
    // 现在进行分页查询，假设req.query中有page和limit参数,我需要对page和limit进行校验返回对应的数据
    const page = parseInt(req.query.pageNum) || 1;
    const limit = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * limit;
    // 按照创建时间倒序排列，最新的游记在前面
    const trips = await Trip.find({ auditStatus: "pass", isDeleted: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // 返回数据时，需要返回总数，方便前端进行分页
    const total = await Trip.countDocuments({
      auditStatus: "pass",
      isDeleted: false,
    });
    if (skip >= total) {
      return res.status(404).json({ message: "页码超出范围" });
    }
    res.status(200).json({ data: trips, total });
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
    parseForm(req, res, async () => {
      const updatedTrip = await Trip.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ data: updatedTrip });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 物理删除游记
exports.deleteTrip = async (req, res) => {
  try {
    // 后续需要检查用户权限，只有游记的作者才能删除游记
    // 删除游记并获取被删除的游记对象
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);

    // 检查是否成功找到并删除了游记
    if (!deletedTrip) {
      return res.status(404).json({ message: "游记未找到" });
    }

    // 获取游记的图片列表
    const images = deletedTrip.images;

    // 如果存在需要删除的图片，调用 deleteFilesFromOSS 进行批量删除
    if (images && images.length > 0) {
      const deleteResult = await deleteFilesFromOSS(images);
      if (!deleteResult.success) {
        // 如果图片删除失败，可以记录错误或返回错误信息
        // 注意：这里我们选择记录错误，但仍然返回游记删除成功的信息
        console.error("图片删除失败:", deleteResult.error);
      }
    }

    // 返回成功删除游记的响应
    res.status(200).json({ message: "游记及其图片已删除" });
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
    // 判断传入status是否合法
    if (!["all", "pass", "reject", "wait"].includes(req.params.status)) {
      throw new Error("status参数不合法");
    }
    // 分页查询
    const page = parseInt(req.query.pageNum) || 1;
    const limit = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * limit;
    const trips = await Trip.find({
      // userId: req.user._id,
      userId: req.query.userId,
      auditStatus:
        req.params.status === "all" ? { $ne: null } : req.params.status,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Trip.countDocuments({
      // userId: req.user._id,
      userId: req.query.userId,
      auditStatus:
        req.params.status === "all" ? { $ne: null } : req.params.status,
      isDeleted: false,
    });
    if (skip >= total) {
      return res.status(404).json({ message: "页码超出范围" });
    }
    res.status(200).json({ data: trips, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 逻辑删除游记
exports.deleteAuditTrip = async (req, res) => {
  try {
    // 后期需要校验角色权限，超级管理员才能删除游记
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
    // 判断传入status是否合法
    if (!["all", "pass", "reject", "wait"].includes(req.params.status)) {
      throw new Error("status参数不合法");
    }
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

// 上传游记图片列表或视频
exports.uploadTripMedia = (req, res) => {
  // 使用multer的single方法处理单个文件上传
  // 文件字段名假设为'file'
  upload.single("file")(req, res, function (err) {
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

    res.status(200).json({ url: file.url, message: "上传成功" });
  });
};

exports.uploadTripMediaMultiple = (req, res) => {
  // 假设前端表单中的文件字段名为'images'，最多上传5张图片
  upload.array("images", 5)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // 发生Multer错误（例如文件太多）
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // 发生其他错误
      return res.status(500).json({ error: "文件上传失败" });
    }

    // 上传成功，req.files 包含了文件的信息（注意这里是files，不是file）
    const files = req.files;
    console.log(files);

    // 返回上传文件的URL数组
    const urls = files.map((file) => file.url); // multer-aliyun-oss会在成功上传后添加url属性到每个文件对象
    res.status(200).json({ urls, message: "上传成功" });
  });
};
