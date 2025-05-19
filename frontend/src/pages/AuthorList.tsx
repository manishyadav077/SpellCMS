import { useEffect } from "react";
import { useAuthorStore } from "../store/authorStore";
import { Link } from "react-router-dom";
import AuthorTable from "../component/AuthorTable";
import BackButton from "../component/BackButton";

export default function AuthorList() {
  const { authors, fetchAuthors, loading } = useAuthorStore();

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Authors</h1>
        <Link
          to="/authors/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Author
        </Link>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <AuthorTable authors={authors} />
      )}
    </div>
  );
}
