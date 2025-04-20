import axios from "axios";
import { API_URL } from "../constant.js";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

export const getProductSize = async () => {
  try {
    const response = await axios.get(`${API_URL}/productSize`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product sizes:", error);
    throw error;
  }
};

export const getProductSizeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/productSize/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product size by ID:", error);
    throw error;
  }
};

export const getProductSizeBySizeId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/productSize/size/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product size by Size ID:", error);
    throw error;
  }
};

export const getProductImage = async () => {
  try {
    const response = await axios.get(`${API_URL}/productImage`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product images:", error);
    throw error;
  }
};

export const getProductImageById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/productImage/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product image by ID:", error);
    throw error;
  }
};

export const getProductCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/productCategory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
};

export const getProductCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/productCategory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product category by ID:", error);
    throw error;
  }
};

export const getCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/category`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
};
