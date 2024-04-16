import { login, register } from "@/api/user";

export type AuthData = {
  token: string;
  user: {
    username: string;
    userId: string;
    avatar: string;
  };
};

const signIn = async (formData) => {
  try {
    const response = await login(formData);
    const userInfo = response.userInfo;
    const authData = {
      token: response.token,
      user: userInfo,
    };
    return authData;
  } catch (error) {
    console.error("login failed:", error);
    throw error; // 抛出错误，让外部调用者处理
  }
};

const registerUser = async (formData) => {
  try {
    const response = await register(formData);
    console.log("register response:authdata", response);
    const userInfo = response.userInfo;
    const authData = {
      token: response.token,
      user: userInfo,
    };
    return authData;
  } catch (error) {
    console.error("register failed:", error);
    throw error; // 抛出错误，让外部调用者处理
  }
};

export const authService = {
  signIn,
  registerUser,
};
