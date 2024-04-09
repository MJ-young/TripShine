import request from "@/utils/request";

export interface Admin {
  _id: string;
  username: string;
  password: string;
  role: string;
}

interface LoginResponse {
  userInfo: Admin;
  token: string;
  message: string;
}

// login
export const login = (data: Admin): Promise<LoginResponse> => {
  return request({
    url: `/api/admin/login`,
    method: "post",
    data,
  });
};

// logout
export const logout = (): Promise<unknown> => {
  return request({
    url: `/api/admin/logout`,
    method: "post",
  });
};
