import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoryStore } from "../store/categoryStore";
import type { Category } from "../utils/type";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FiTag, FiLink } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import BackButton from "./BackButton";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
});

type FormData = z.infer<typeof schema>;

export default function CategoryForm() {
  const { addCategory, editCategory, categories, fetchCategories } =
    useCategoryStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  useEffect(() => {
    if (!isEditMode) {
      setIsLoading(false);
      return;
    }

    const loadCategoryData = async () => {
      try {
        await fetchCategories();
        const categoryToEdit = categories.find((cat) => cat.id === Number(id));

        if (!categoryToEdit) {
          throw new Error("Category not found");
        }

        reset({
          name: categoryToEdit.name,
          slug: categoryToEdit.slug,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load category data"
        );
        toast.error("Failed to load category");
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryData();
  }, [id, isEditMode, reset, fetchCategories]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditMode) {
        await editCategory(Number(id), data as Category);
        toast.success("Category updated successfully");
      } else {
        await addCategory(data as Category);
        toast.success("Category created successfully");
      }
      navigate("/categories");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category");
      toast.error("Failed to save category");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin" size={24} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button
            onClick={() => navigate("/categories")}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {isEditMode ? "Edit Category" : "Create Category"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <FiTag className="mr-2" />
            Name
          </label>
          <input
            {...register("name")}
            placeholder="Category name"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <FiLink className="mr-2" />
            Slug
          </label>
          <input
            {...register("slug")}
            placeholder="e.g., tech-news"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              errors.slug ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.slug && (
            <p className="text-sm text-red-600">{errors.slug.message}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting && <FaSpinner className="animate-spin mr-2" />}
            {isEditMode ? "Update Category" : "Create Category"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="cursor-pointer px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
