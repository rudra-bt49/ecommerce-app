import axiosInstance from "../axios";
import { API } from "../../config/api";

export const getUserById = async (id) => {
  if (!id) throw new Error("User ID is required");

  return axiosInstance.get(API.USERS.GET_BY_ID(id));
};

export const updateUser = async (id, payload) => {
  if (!id) throw new Error("User ID is required");

  return axiosInstance.put(API.USERS.UPDATE(id), payload);
};

export const getAllUsers = async () => {
  return axiosInstance.get(API.USERS.GET_ALL);
};

export const deleteUser = async (id) => {
  return axiosInstance.delete(API.USERS.DELETE(id));
};