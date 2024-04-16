import request from "@/utils/request";

export interface User {
  userId?: string;
  username: string;
  password: string;
  avatar?: string;
}

interface LoginResponse {
  userInfo: User;
  token: string;
  message: string;
}

//      用户注册
export const register = (data: User): Promise<LoginResponse> => {
  return request({
    url: `/api/user/register`,
    method: "post",
    data,
    headers: {
      isToken: false,
    },
  });
};
//      用户登录
export const login = (data: User): Promise<LoginResponse> => {
  return request({
    url: `/api/user/login`,
    method: "post",
    data,
    headers: {
      isToken: false,
    },
  });
};

interface UploadAvatarResponse {
  url: string;
  message: string;
}
export const updateAvatar = (file: FormData): Promise<UploadAvatarResponse> => {
  return request({
    url: "/api/user/upload/avatar/",
    method: "post",
    data: file,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
