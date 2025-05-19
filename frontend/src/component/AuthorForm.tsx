import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthorStore } from "../store/authorStore";
import { toast } from "react-toastify";
import { FiImage, FiUser } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import BackButton from "./BackButton";

const authorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  avatar: z.string().url("Avatar must be a valid URL"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

type AuthorFormData = z.infer<typeof authorSchema>;

export default function AuthorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authors, addAuthor, updateAuthor, fetchAuthors } = useAuthorStore();

  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: "",
      avatar: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const loadAuthorData = async () => {
      try {
        await fetchAuthors();
        const existingAuthor = authors.find((a) => a.id === Number(id));

        if (!existingAuthor) {
          throw new Error("Author not found");
        }

        reset({
          name: existingAuthor.name,
          avatar: existingAuthor.avatar,
          bio: existingAuthor.bio,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load author");
        toast.error("Failed to load author data");
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthorData();
  }, [id, reset, fetchAuthors]);

  const onSubmit = async (data: AuthorFormData) => {
    try {
      if (id) {
        await updateAuthor({ id: Number(id), ...data });
        toast.success("Author updated successfully");
      } else {
        await addAuthor(data);
        toast.success("Author created successfully");
      }
      navigate("/authors");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save author");
      toast.error("Please try again");
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
            onClick={() => navigate("/authors")}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Back to Authors
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
        {id ? "Edit Author" : "Create Author"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <FiUser className="mr-2" />
            Name
          </label>
          <input
            {...register("name")}
            placeholder="Author name"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300">
            Bio
          </label>
          <textarea
            {...register("bio")}
            rows={4}
            placeholder="Author bio"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              errors.bio ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.bio && (
            <p className="text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <FiImage className="mr-2" />
            Avatar URL
          </label>
          <input
            {...register("avatar")}
            placeholder="https://example.com/avatar.jpg"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              errors.avatar ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.avatar && (
            <p className="text-sm text-red-600">{errors.avatar.message}</p>
          )}
          {watch("avatar") && (
            <div className="mt-2">
              <img
                src={watch("avatar")}
                alt="Avatar preview"
                className="max-h-48 rounded-lg object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting && <FaSpinner className="animate-spin mr-2" />}
            {id ? "Update Author" : "Create Author"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/authors")}
            className="cursor-pointer px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
