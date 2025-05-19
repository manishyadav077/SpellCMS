import axiosInstance from "../utils/axiosInstance";
import type{ Author } from "../utils/type";

export const getAuthors = async (): Promise<Author[]> => {
  const res = await axiosInstance.get("/authors");
  // console.log(res)
  return res.data;
};

export const createAuthor = async (author: Omit<Author, "id">): Promise<Author> => {
  const res = await axiosInstance.post("/authors", author);
  // console.log(res)
  return res.data;
};

export const updateAuthor = async (id: number, author: Omit<Author, "id">): Promise<Author> => {
  const res = await axiosInstance.put(`/authors/${id}`, author);
  // console.log(res)
  return res.data;
};

export const deleteAuthor = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/authors/${id}`);
};
