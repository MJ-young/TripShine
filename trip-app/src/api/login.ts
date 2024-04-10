import request from "../utils/request";

export interface Usr {
    username: string;
    password: string;

}

//      用户注册
export const registerUsr = (data: Usr): Promise<unknown> => {
    return request({
        url: `/api/user/register`,
        method: "post",
        data,
    });
};
//      用户登录
export const loginUsr = (data: Usr): Promise<unknown> => {
    return request({
        url: `/api/user/login`,
        method: "post",
        data,
    });
};