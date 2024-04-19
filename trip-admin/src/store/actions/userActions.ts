// src/store/actions/userActions.js

import { SET_USER, UPDATE_USER, CLEAR_USER } from "../actionTypes";
import { setToken, removeToken, removeUser } from "@/utils/auth";

// Action to set user information
export const setUser = (userData) => {
  // setToken
  setToken(userData.token);
  return {
    type: SET_USER,
    payload: userData,
  };
};

// Action to update user information
export const updateUser = (updates) => ({
  type: UPDATE_USER,
  payload: updates,
});

// Action to clear user information
export const clearUser = () => {
  removeToken();
  removeUser();
  return {
    type: CLEAR_USER,
  };
};
