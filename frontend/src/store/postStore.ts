import { create } from "zustand";
import type{ Post } from "../utils/type";
import * as postService from "../services/postService";

interface PostState {
  posts: Post[];
  fetch: () => Promise<void>;
  create: (post: Post) => Promise<void>;
  update: (id: number, post: Post) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  fetch: async () => {
    const posts = await postService.getPosts();
    set({ posts });
  },
  create: async (post) => {
    const newPost = await postService.createPost(post);
    set((state) => ({ posts: [...state.posts, newPost] }));
  },
  update: async (id, post) => {
    const updated = await postService.updatePost(id, post);
    set((state) => ({
      posts: state.posts.map((p) => (p.id === id ? updated : p)),
    }));
  },
  remove: async (id) => {
    await postService.deletePost(id);
    set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
  },
}));
