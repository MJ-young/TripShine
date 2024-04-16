import { SET_USER, UPDATE_USER, CLEAR_USER } from "../actionTypes";
import {
  setToken,
  removeToken,
  setUserCookie,
  UpdateUserCookie,
} from "@/utils/auth";

// Action to set user information
export const setUser = (userData) => {
  setToken(userData.token);
  setUserCookie(userData.user);
  return {
    type: SET_USER,
    payload: userData,
  };
};

// Action to update user information
export const updateUser = (updates) => {
  UpdateUserCookie(updates);
  return {
    type: UPDATE_USER,
    payload: updates,
  };
};

// Action to clear user information
export const clearUser = () => {
  removeToken();
  return {
    type: CLEAR_USER,
  };
};
