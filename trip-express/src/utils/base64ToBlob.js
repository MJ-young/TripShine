/**
 * Converts a Base64 string to a Blob object with the correct MIME type.
 * @param {string} base64 - The base64 encoded string.
 * @returns {Blob} - The Blob object.
 */
const base64ToBlob = (base64) => {
  // 解析 Base64 字符串，分离 MIME 类型和数据
  const parts = base64.match(/^data:(.+);base64,(.+)$/);
  if (!parts) {
    throw new Error("Invalid base64 string");
  }

  const contentType = parts[1]; // 获取 MIME 类型（如 'image/png'）
  const raw = window.atob(parts[2]); // Base64 解码
  const rawLength = raw.length;

  // 将解码的二进制数据转换为 ArrayBuffer
  const arrayBuffer = new ArrayBuffer(rawLength);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < rawLength; i++) {
    uint8Array[i] = raw.charCodeAt(i);
  }

  // 创建 Blob 对象
  const blob = new Blob([uint8Array], { type: contentType });
  return blob;
};

module.exports = { base64ToBlob };
