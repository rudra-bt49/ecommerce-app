import axiosInstance from "../axios";
import { API } from "../../config/api";

export const getAllCarts = async () => {
  return axiosInstance.get(API.CARTS.GET_ALL);
};

export const getCartById = async (id) => {
  return axiosInstance.get(API.CARTS.GET_BY_ID(id));
};


export const createCart = async (payload) => {
  return axiosInstance.post(API.CARTS.CREATE, payload);
};

export const updateCart = async (id, payload) => {
  return axiosInstance.put(API.CARTS.UPDATE(id), payload);
};

export const deleteCart = async (id) => {
  return axiosInstance.delete(API.CARTS.DELETE(id));
};
