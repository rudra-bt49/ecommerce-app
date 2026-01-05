import axiosInstance from "../axios";
import { API } from "../../config/api";

export const getAllProducts = async () => {
  return axiosInstance.get(API.PRODUCTS.GET_ALL);
};

export const getProductById = async (id) => {
  return axiosInstance.get(API.PRODUCTS.GET_BY_ID(id));
};

export const createProduct = async (payload) => {
  return axiosInstance.post(API.PRODUCTS.CREATE, payload);
};

export const updateProduct = async (id, payload) => {
  return axiosInstance.put(API.PRODUCTS.UPDATE(id), payload);
};

export const deleteProduct = async (id) => {
  return axiosInstance.delete(API.PRODUCTS.DELETE(id));
};
