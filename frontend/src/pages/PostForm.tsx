import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiImage, FiTag, FiUser, FiFolder } from "react-icons/fi";
import { usePostStore } from "../store/postStore";
import type { Post } from "../utils/type";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import BackButton from "../component/BackButton";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  body: z.string().min(10, "Content must be at least 10 characters"),
  authorId: z.string().min(1, "Please select an author"),
  categoryId: z.string().min(1, "Please select a category"),
  tags: z.string().optional(),
  status: z.enum(["Draft", "Published"]),
  coverImage: z.string().url("Please enter a valid URL").optional(),
});

type FormData = z.infer<typeof schema>;

export default function PostForm() {
  const { create, update, posts, fetch } = usePostStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(isEditMode); // Only load for edit mode
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    control, // Added control to properly manage form state
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      body: "",
      authorId: "",
      categoryId: "",
      tags: "",
      status: "Draft",
      coverImage: "",
    },
  });

  // Fetch and set form values when in edit mode
  useEffect(() => {
    if (!isEditMode) {
      setIsLoading(false);
      return;
    }

    const loadPostData = async () => {
      try {
        await fetch();
        const postToEdit = posts.find((post) => post.id === Number(id));

        if (!postToEdit) {
          throw new Error("Post not found");
        }

        reset({
          title: postToEdit.title,
          body: postToEdit.body,
          authorId: String(postToEdit.authorId),
          categoryId: String(postToEdit.categoryId),
          tags: postToEdit.tags?.join(", ") || "",
          status: (postToEdit.status.charAt(0).toUpperCase() +
            postToEdit.status.slice(1)) as "Draft" | "Published",
          coverImage: postToEdit.coverImage || "",
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load post data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPostData();
  }, [id, isEditMode, reset, fetch]);

  const onSubmit = async (formData: FormData) => {
    try {
      const postData: Post = {
        id: isEditMode ? Number(id) : 0,
        title: formData.title,
        body: formData.body,
        authorId: Number(formData.authorId),
        categoryId: Number(formData.categoryId),
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
        status: formData.status.toLowerCase() as "draft" | "published",
        coverImage: formData.coverImage || "",
        createdAt: isEditMode ? "" : new Date().toISOString(),
      };

      if (isEditMode) {
        await update(postData.id, postData);
      } else {
        await create(postData);
      }

      navigate("/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
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
            onClick={() => navigate("/posts")}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Back to Posts
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
        {isEditMode ? "Edit Post" : "Create Post"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <div className="space-y-2">
          <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300">
            Post Title
          </label>
          <input
            {...register("title")}
            placeholder="Enter post title"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Content Field */}
        <div className="space-y-2">
          <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <textarea
            {...register("body")}
            placeholder="Write your post content here..."
            rows={6}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              errors.body ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.body && (
            <p className="text-sm text-red-600">{errors.body.message}</p>
          )}
        </div>

        {/* Cover Image Field */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <FiImage className="mr-2" />
            Cover Image URL
          </label>
          <input
            {...register("coverImage")}
            placeholder="https://example.com/image.jpg"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              errors.coverImage ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.coverImage && (
            <p className="text-sm text-red-600">{errors.coverImage.message}</p>
          )}
          {watch("coverImage") && (
            <div className="mt-2">
              <img
                src={watch("coverImage")}
                alt="Cover preview"
                className="max-h-60 rounded-lg object-cover"
              />
            </div>
          )}
        </div>

        {/* Author and Category Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <FiUser className="mr-2" />
              Author
            </label>
            <select
              {...register("authorId")}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                errors.authorId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Author</option>
              <option value="1">Tobby</option>
              <option value="2">Rao</option>
            </select>
            {errors.authorId && (
              <p className="text-sm text-red-600">{errors.authorId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <FiFolder className="mr-2" />
              Category
            </label>
            <select
              {...register("categoryId")}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                errors.categoryId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Category</option>
              <option value="1">Tech</option>
              <option value="2">Life Style</option>
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-600">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>

        {/* Tags Field */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <FiTag className="mr-2" />
            Tags (comma separated)
          </label>
          <input
            {...register("tags")}
            placeholder="tag1, tag2, tag3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white border-gray-300"
          />
          {errors.tags && (
            <p className="text-sm text-red-600">{errors.tags.message}</p>
          )}
        </div>

        {/* Status Field */}
        <div className="space-y-2">
          <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register("status")}
                value="Draft"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Draft
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register("status")}
                value="Published"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Published
              </span>
            </label>
          </div>
          {errors.status && (
            <p className="text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting && <FaSpinner className="animate-spin mr-2" />}
            {isEditMode ? "Update Post" : "Create Post"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/posts")}
            className="px-6 py-3 cursor-pointer bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
