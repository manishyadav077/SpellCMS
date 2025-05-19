import { create } from "zustand";
import type { Author } from "../utils/type";
import * as authorService from "../services/authorService";

interface AuthorState {
  authors: Author[];
  loading: boolean;
  error: string | null;
  fetchAuthors: () => Promise<void>;
  addAuthor: (author: Omit<Author, "id">) => Promise<void>;
  updateAuthor: (author: Author) => Promise<void>;
  deleteAuthor: (id: number) => Promise<void>;
}

export const useAuthorStore = create<AuthorState>((set) => ({
  authors: [],
  loading: false,
  error: null,

  fetchAuthors: async () => {
    set({ loading: true, error: null });
    try {
      const data = await authorService.getAuthors();
      set({ authors: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addAuthor: async (author) => {
    set({ loading: true, error: null });
    try {
      const newAuthor = await authorService.createAuthor(author);
      set((state) => ({
        authors: [...state.authors, newAuthor],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateAuthor: async (author) => {
    set({ loading: true, error: null });
    try {
      const updated = await authorService.updateAuthor(author.id, author);
      set((state) => ({
        authors: state.authors.map((a) => (a.id === updated.id ? updated : a)),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteAuthor: async (id) => {
    set({ loading: true, error: null });
    try {
      await authorService.deleteAuthor(id);
      set((state) => ({
        authors: state.authors.filter((a) => a.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
