import { SET_USER, UPDATE_USER, CLEAR_USER } from "../actions";
import { getToken, getUserCookie } from "@/utils/auth";

const initialState = {
  user: getUserCookie() || {
    userId: "userid",
    username: "用户名",
    avatar:
      "http://tripshine.oss-cn-shanghai.aliyuncs.com/public/images/8ea864552b199085f746839df5e16428.png",
  },
  token: getToken(),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case CLEAR_USER:
      return {
        user: null,
        token: "",
      };
    default:
      return state;
  }
};

export default userReducer;
