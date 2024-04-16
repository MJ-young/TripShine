import Cookies from "js-cookie";

const TokenKey = "User-Token";

interface User {
  userId: string;
  username: string;
  avatar: string;
}

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function setUserCookie(user: User) {
  Cookies.set("userId", user.userId);
  Cookies.set("username", user.username);
  Cookies.set("avatar", user.avatar);
}

export function getUserCookie() {
  return {
    userId: Cookies.get("userId"),
    username: Cookies.get("username"),
    avatar: Cookies.get("avatar"),
  };
}

export function removeUserCookie() {
  Cookies.remove("userId");
  Cookies.remove("username");
  Cookies.remove("avatar");
}

export function UpdateUserCookie(updates: any) {
  if (updates.userId) {
    Cookies.set("userId", updates.userId);
  }
  if (updates.username) {
    Cookies.set("username", updates.username);
  }
  if (updates.avatar) {
    Cookies.set("avatar", updates.avatar);
  }
}
