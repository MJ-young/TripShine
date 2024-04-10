// src/api/statusTrip.ts  用户个人发布的游记
import request from "../utils/request"; // 假设你已经有了一个配置好的axios实例

// 定义接口返回类型
interface TripListResponse {
  data: Trip[];
  total: number;
}
interface FetchTripsParams {
  status: string;
  pageNum: number;
  pageSize: number;
}
// 定义旅行日记类型
export interface Trip {
  userId: String;
  _id: string;
  title: string;
  content: string;
  username: string;
  auditStatus: string;
  avatar: string;
  createTime: string;
  images: string[];
  // 其他字段...
}

// 封装查询用户个人发布的游记
export const getUserTrips = (
  params: FetchTripsParams
): Promise<TripListResponse> => {
  return request({
    url: `/api/trip/status/${params.status}`,
    method: "get",
    params: {
      pageNum: params.pageNum || 1,
      pageSize: params.pageSize || 10,
    },
  });
};

// 封装用户发布游记
export const addTrip = (params: {
  //用户传递的参数
  title: string;
  content: string;
  userId: string;
  username: string;
  avatar: string;
  images: string[];
}): Promise<Trip> => {
  //函数返回一个Promise解析为Trip对象

  return request({
    url: "/api/trip/",
    method: "post",
    params: {
      //传递给request函数的选项之一，发送给服务器的数据
      title: params.title,
      content: params.content,
      images: params.images,
      userId: params.userId,
      username: params.username,
      avatar: params.avatar,
    },
  });
};

// 封装删除的函数
export const deleteTrip = (id: string): Promise<unknown> => {
  return request({
    url: `/api/trip/${id}`,
    method: "delete",
  });
};

//用户上传头像
export const updateAvatar = (id: string): Promise<unknown> => {
  return request({
    url: `/api/user/upload/avatar/`,
    method: "post",
  });
};
