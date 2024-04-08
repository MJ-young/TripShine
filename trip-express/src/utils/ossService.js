const ossClient = require("../config/ossClient");

// 批量删除文件
async function deleteFilesFromOSS(objectNames) {
  try {
    // 注意：deleteMulti 的第二个参数是一个选项对象，其中 quiet 为 true 时，OSS 只返回删除操作的简要结果。
    const result = await ossClient.deleteMulti(objectNames, { quiet: true });
    console.log("Batch delete result:", result);
    return { success: true, message: "文件批量删除成功" };
  } catch (err) {
    console.error("Error during batch file deletion:", err);
    return { success: false, message: "文件批量删除失败", error: err };
  }
}

module.exports = { deleteFilesFromOSS };
