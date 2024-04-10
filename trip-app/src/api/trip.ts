import request from "@/utils/request";
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
  _id: string;
  title: string;
  content: string;
  images: string[];
  username: string;
  auditStatus: string;
  createdTime: string;
  // 其他字段...
}

// 获取所有已通过审核的旅行日记
export const getAllPassTrips = (
  params: FetchTripsParams
): Promise<TripListResponse> => {
  return request({
    url: `/api/trip/list`,
    method: "get",
    params,
  });
};

// 关键词搜索旅行日记
export const searchTrips = (params: {
  keyword: string;
}): Promise<TripListResponse> => {
  return request({
    url: `/api/trip/search`,
    method: "get",
    params,
  });
};

// 创建旅行日记
export const createTrip = (params: {
  title: string;
  content: string;
  images: string[];
}): Promise<Trip> => {
  return request({
    url: "/api/trip/",
    method: "post",
    data: params,
  });
};

// 更新旅行日记
export const updateTrip = (params: {
  _id: string;
  title: string;
  content: string;
  images: string[];
}): Promise<Trip> => {
  console.log(params);
  return request({
    url: `/api/trip/${params._id}`,
    method: "put",
    data: params,
  });
};

// 删除旅行日记
export const deleteTrip = (id: string): Promise<void> => {
  return request({
    url: `/api/trip/${id}`,
    method: "delete",
  });
};
