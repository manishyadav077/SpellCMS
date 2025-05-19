import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg">
      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-300">
        SpellCMS
      </h1>

      <div className="flex items-center gap-4">
        {/* <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded text-sm bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:opacity-80"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>  */}

        <button
          onClick={handleLogout}
          className="cursor-pointer px-4 py-2 rounded text-sm bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
