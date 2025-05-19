import { useAuthorStore } from "../store/authorStore";
import { Link } from "react-router-dom";
import type { Author } from "../utils/type";

type AuthorTableProps = {
  authors: Author[];
};

const AuthorTable = ({ authors }: AuthorTableProps) => {
  const { deleteAuthor } = useAuthorStore();

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          <th>Name</th>
          <th>Avatar</th>
          <th>Bio</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <tr key={author.id}>
            <td>{author.name}</td>
            <td>
              <img src={author.avatar} className="w-10 h-10 rounded-full" />
            </td>
            <td>{author.bio}</td>
            <td>
              <Link
                to={`/authors/edit/${author.id}`}
                className="text-blue-600 mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteAuthor(author.id)}
                className="ml-2.5 cursor-pointer text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AuthorTable;
