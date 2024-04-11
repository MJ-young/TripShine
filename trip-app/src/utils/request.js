import axios from "axios";
import { getToken } from "@/utils/auth";
import NavigationService from "./NavigationService";
import Toast from "react-native-toast-message";

export const isRelogin = { show: false };

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// 创建axios实例
const service = axios.create({
  baseURL: "http://localhost:3000", // api的base_url
  timeout: 5000, // 请求超时时间
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
      Toast.show({
        type: "success",
        position: "top",
        text1: "Success",
        text2: res.data.message,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        onShow: () => {},
        onHide: () => {},
      });
    }
    return res.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "登录失效",
        text2: "即将跳转登录页面",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        onShow: () => {},
        onHide: () => {
          NavigationService.navigate("Login");
        },
      });
    } else {
      return Promise.reject(error);
    }
  }
);

export default service;
