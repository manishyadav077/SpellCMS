import { useCategoryStore } from "../store/categoryStore";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { Category } from "../utils/type";

type CategoryTableProps = {
  onEdit: (category: Category) => void;
};

export default function CategoryTable() {
  const { categories, fetchCategories, removeCategory } = useCategoryStore();
  // console.log("categories", categories)

  useEffect(() => {
    fetchCategories().catch(() => toast.error("Failed to load categories"));
  }, []);

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          <th>Name</th>
          <th>Slug</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id} className="border-t">
            <td className="p-2">{category.name}</td>
            <td className="p-2">{category.slug}</td>
            <td className="p-2">
              <Link
                to={`/categories/edit/${category.id}`}
                className="text-blue-600 mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => removeCategory(category.id)}
                className="cursor-pointer ml-2.5 text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
