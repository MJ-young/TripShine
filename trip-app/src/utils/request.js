import axios from "axios";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isRelogin = { show: false };
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

let baseURL = "http://localhost:3000"; // 默认使用 localhost

if (Constants.expoConfig) {
  const { expoConfig } = Constants;
  if (expoConfig.hostUri) {
    baseURL = `http://${expoConfig.hostUri.split(":").shift()}:3000`;
  }
}

// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 20000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  async (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    let token = null;
    const authDataSerialized = await AsyncStorage.getItem("@AuthData");
    if (authDataSerialized) {
      //If there are data, it's converted to an Object and the state is updated.
      const _authData = JSON.parse(authDataSerialized);
      token = _authData.token;
    }
    if (token && !isToken) {
      config.headers["Authorization"] = `Bearer ${token}`; // 设置请求头的Authorization
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
          // 移除本地存储的用户信息
          AsyncStorage.removeItem("@AuthData");
        },
      });
    } else {
      return Promise.reject(error);
    }
  }
);

export default service;
