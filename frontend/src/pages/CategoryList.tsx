import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../store/categoryStore";
import CategoryTable from "../component/CategoryTable";
import BackButton from "../component/BackButton";

export default function CategoryList() {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Link
          to="/categories/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Category
        </Link>
      </div>
      {categories.length === 0 ? (
        <p className="text-gray-600">No categories available.</p>
      ) : (
        <CategoryTable />
      )}
    </div>
  );
}
