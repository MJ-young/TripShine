import request from "@/utils/request";

interface UploadResponse {
  url: string;
  status: string;
  code: number;
}

export const upload = (file: FormData): Promise<UploadResponse> => {
  return request({
    url: "/api/trip/upload/",
    method: "post",
    data: file,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
