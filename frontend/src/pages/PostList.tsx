import { useEffect, useState } from "react";
import { usePostStore } from "../store/postStore";
import { Link } from "react-router-dom";
import PostCard from "../component/PostCard";
import { toast } from "react-toastify";
import BackButton from "../component/BackButton";

const PostList = () => {
  const { posts, fetch, remove } = usePostStore();
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        await fetch();
      } catch (error) {
        toast.error("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [fetch]);

  const filteredPosts = posts.filter((post) => {
    const matchesTitleOrTag =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus = statusFilter ? post.status === statusFilter : true;
    const matchesCategory = categoryFilter
      ? post.categoryId === Number(categoryFilter)
      : true;

    return matchesTitleOrTag && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          to="/posts/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Create Post
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or tag"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="1">Tech</option>
          <option value="2">Lifestyle</option>
          <option value="3">News</option>
        </select>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={() => remove(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
