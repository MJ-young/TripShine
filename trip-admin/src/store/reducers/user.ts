// src/store/reducers/userReducer.js

import { SET_USER, UPDATE_USER, CLEAR_USER } from "../actions";
import { getToken } from "@/utils/auth";

const initialState = {
  user: {},
  token: getToken(),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
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
