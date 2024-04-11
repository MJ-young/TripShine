import axios from "axios";
import { notification, Modal, message } from "antd";
import { getToken } from "@/utils/auth";
import { clearUser } from "@/store/actions";

export const isRelogin = { show: false };

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// 创建axios实例
const service = axios.create({
  baseURL: "", // API的基础URL
  // timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    if (getToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 设置请求头的Authorization
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const code = res.status;
    if (code !== 200) {
      notification.success({
        message: "Success",
        description: res.data.message,
      });
    }
    return res.data;
  },
  (error) => {
    if (error.response.status) {
      const msg = error.response.data.message;
      switch (error.response.status) {
        case 401:
          if (isRelogin.show) {
            return;
          }
          isRelogin.show = true;
          Modal.confirm({
            title: "系统提示",
            content: "登录状态已过期，您可以继续留在该页面，或者重新登录",
            okText: "重新登录",
            cancelText: "取消",
            onOk() {
              clearUser();
              window.location.href = "/";
              isRelogin.show = false;
            },
            onCancel() {
              isRelogin.show = false;
            },
          });
          break;
        default:
          message.error({
            content: msg,
            duration: 5,
          });
          break;
      }
      return Promise.reject(error);
    }
  }
);

export default service;
