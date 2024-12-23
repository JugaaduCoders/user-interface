import { Any, User } from "@/types";

export function setItem(key: string, value: Any) {
  localStorage.setItem(key, value);
}

export function getItem(key: string) {
  const val = localStorage.getItem(key);
  if (val) return val;
  return undefined;
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}

export function getUserFromLS() {
  return JSON.parse(getItem("user") ?? "{}") as User;
}

export function getTokenFromLS() {
  return getItem("token");
}

export function setUserInLS(user: User) {
  return setItem("user", JSON.stringify(user));
}

export function setTokenInLS(token: string) {
  return setItem("token", token);
}
