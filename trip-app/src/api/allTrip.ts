// src/api/allTrip.ts     所有用户已通过审核的游记
import request from "../utils/request"; // 假设你已经有了一个配置好的axios实例

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
export const getAllPassTrips = (
    params: FetchTripsParams
): Promise<TripListResponse> => {
    return request({
        url: `/api/trip/`,
        method: "get",
    });
};

