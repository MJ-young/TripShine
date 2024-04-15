import { upload } from "@/api/upload";

export const base64ToFile = (
  base64: string,
  fileName: string,
  type: string
) => {
  // 解析 Base64 字符串，分离 MIME 类型和数据
  const parts = base64.match(/^data:(.+);base64,(.+)$/);
  let contentType = type;
  let raw = base64;
  let rawLength = raw.length;
  console.log("parts", parts);
  if (parts) {
    contentType = parts[1]; // 获取 MIME 类型（如 'image/png'）
    raw = window.atob(parts[2]); // Base64 解码
    rawLength = raw.length;
  }
  // 将解码的二进制数据转换为 ArrayBuffer
  const arrayBuffer = new ArrayBuffer(rawLength);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < rawLength; i++) {
    uint8Array[i] = raw.charCodeAt(i);
  }

  // 创建 Blob 对象
  const blob = new Blob([uint8Array], { type: contentType });
  // 创建 File 对象
  const file = new File([blob], fileName, { type: contentType });
  return file;
};

export const uploadImage = async (
  base64: string,
  fileName: string,
  type: string
): Promise<string> => {
  try {
    const file = base64ToFile(base64, fileName, type);
    const formData = new FormData();
    formData.append("file", file);
    console.log("formData", formData);
    const res = await upload(formData);
    return res.url;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const uploadImageByUri = async (uri: string): Promise<string> => {
  try {
    let filename = uri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Create FormData
    const formData = new FormData();
    formData.append("file", { uri: uri, name: filename, type });
    const res = await upload(formData);
    return res.url;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
