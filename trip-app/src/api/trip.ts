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
  id: string;
  title: string;
  content: string;
  username: string;
  auditStatus: string;
  createdAt: string;
  // 其他字段...
}

// 获取所有已通过审核的旅行日记
export const getAllPassTrips = (
  params: FetchTripsParams
): Promise<TripListResponse> => {
  return request({
    url: `/api/trip/`,
    method: "get",
    params,
  });
};

// 关键词搜索旅行日记
export const searchTrips = (
  params: FetchTripsParams & { keyword: string }
): Promise<TripListResponse> => {
  return request({
    url: `/api/trip/search`,
    method: "get",
    params,
  });
};
