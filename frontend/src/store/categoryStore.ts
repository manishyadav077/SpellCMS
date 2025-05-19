import { create } from "zustand";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";
import type { Category } from "../utils/type";

interface CategoryState {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  editCategory: (id: number, category: Category) => Promise<void>;
  removeCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],

  fetchCategories: async () => {
    const data = await getCategories();
    set({ categories: data });
  },

  addCategory: async (category) => {
    await createCategory(category);
    const data = await getCategories();
    set({ categories: data });
  },

  editCategory: async (id, category) => {
    await updateCategory(id, category);
    const data = await getCategories();
    set({ categories: data });
  },

  removeCategory: async (id) => {
    await deleteCategory(id);
    const data = await getCategories();
    set({ categories: data });
  },
}));
