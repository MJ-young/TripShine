import request from "@/utils/request";

// 定义接口返回类型（根据你的实际数据结构调整）
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

// 封装查询旅行日记列表的函数
export const getTripsByStatus = (
  params: FetchTripsParams
): Promise<TripListResponse> => {
  return request({
    url: `/api/trip/audit/status/${params.status}`,
    method: "get",
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
    },
  });
};

// 封装审核通过的函数
export const passTrip = (id: string): Promise<unknown> => {
  return request({
    url: `/api/trip/audit/pass/${id}`,
    method: "put",
  });
};

// 封装拒绝的函数
export const rejectTrip = (id: string): Promise<unknown> => {
  return request({
    url: `/api/trip/audit/reject/${id}`,
    method: "put",
  });
};
