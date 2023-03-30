import jwtDecode from "jwt-decode";
import axiosInstance from "./axios";
import { TokenType } from "./types";

export const setUserInfoInLocalStorage = (token: TokenType): void => {
  let decodedAuthToken: any = jwtDecode(token.access);
  localStorage.setItem("userId", decodedAuthToken.user_id);
  localStorage.setItem("username", decodedAuthToken.username);
  localStorage.setItem("email", decodedAuthToken.email);
  localStorage.setItem("access_token", token.access);
  localStorage.setItem("refresh_token", token.refresh);
  axiosInstance.defaults.headers["Authorization"] =
    "JWT" + localStorage.getItem("access_token");
};

export const removeUserInfoFromLocalStorage = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  axiosInstance.defaults.headers["Authorization"] = null;
};
