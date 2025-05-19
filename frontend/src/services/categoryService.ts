import axiosInstance from "../utils/axiosInstance";
import type { Category } from "../utils/type";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get("/categories");
  return res.data;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const res = await axiosInstance.post("/categories", category);
  return res.data;
};

export const updateCategory = async (id: number, category: Category): Promise<Category> => {
  const res = await axiosInstance.put(`/categories/${id}`, category);
  return res.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/categories/${id}`);
};
