import axios from "../axios";
import { API } from "../../config/api";

export const login = async (credentials) => {
  return axios.post(API.AUTH.LOGIN, credentials);
};

export const register = async (userData) => {
  return axios.post(API.USERS.CREATE, userData);
};

export const logout = () => {
  localStorage.removeItem("token");
};
