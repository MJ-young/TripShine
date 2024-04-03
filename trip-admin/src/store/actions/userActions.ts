// src/store/actions/userActions.js

import { SET_USER, UPDATE_USER, CLEAR_USER } from "../actionTypes";

// Action to set user information
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

// Action to update user information
export const updateUser = (updates) => ({
  type: UPDATE_USER,
  payload: updates,
});

// Action to clear user information
export const clearUser = () => ({
  type: CLEAR_USER,
});
