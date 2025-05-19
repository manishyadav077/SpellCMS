import axiosInstance from "../utils/axiosInstance";
import type { Post } from "../utils/type";

export const getPosts = async (): Promise<Post[]> => {
  const res = await axiosInstance.get("/posts");
  return res.data;
};

export const createPost = async (post: Post): Promise<Post> => {
  const res = await axiosInstance.post("/posts", post);
  return res.data;
};

export const updatePost = async (id: number, post: Post): Promise<Post> => {
  const res = await axiosInstance.put(`/posts/${id}`, post);
  return res.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/posts/${id}`);
};
