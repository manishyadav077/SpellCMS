import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Post } from "../utils/type";

type Props = {
  post: Post;
  onDelete: (id: number) => void;
};

const PostCard = ({ post, onDelete }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col justify-between h-full">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6 flex flex-col justify-between h-full">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {post.body}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs capitalize">
            {post.status}
          </span>

          <div className="flex items-center gap-4">
            <Link
              to={`/posts/edit/${post.id}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FiEdit2 className="text-lg cursor-pointer" />
            </Link>
            <button
              onClick={() => onDelete(post.id)}
              className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
            >
              <FiTrash2 className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
