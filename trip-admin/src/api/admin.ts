import request from "@/utils/request";

interface AdminListResponse {
  data: Admin[];
  total: number;
}

interface FetchAdminsParams {
  pageNum: number;
  pageSize: number;
}

export interface Admin {
  _id: string;
  userId: string;
  username: string;
  password: string;
  role: string;
}

export const getAdminList = (
  params: FetchAdminsParams
): Promise<AdminListResponse> => {
  return request({
    url: `/api/admin/user`,
    method: "get",
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
    },
  });
};

export const deleteUser = (id: string): Promise<unknown> => {
  return request({
    url: `/api/admin/user/${id}`,
    method: "delete",
  });
};

interface AddAdminResponse {
  message: string;
  userInfo: Admin;
}
// addAdmin
export const addAdmin = (data: Admin): Promise<AddAdminResponse> => {
  return request({
    url: `/api/admin/user`,
    method: "post",
    data,
  });
};

// resetpassword
export const resetPassword = (id: string): Promise<unknown> => {
  return request({
    url: `/api/admin/user/${id}`,
    method: "put",
  });
};
