import { FaRegFileAlt, FaUsers, FaFolderOpen } from "react-icons/fa";
import DashboardCard from "../component/DashboardCard";
import Navbar from "../component/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-10">
          Welcome to SpellCMS ✨
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Manage Posts"
            description="Create, edit, and publish blog posts"
            icon={<FaRegFileAlt className="w-8 h-8 text-blue-500" />}
            to="/posts"
          />
          <DashboardCard
            title="Manage Categories"
            description="Organize content by categories"
            icon={<FaFolderOpen className="w-8 h-8 text-pink-500" />}
            to="/categories"
          />
          <DashboardCard
            title="Manage Authors"
            description="Edit author profiles and bios"
            icon={<FaUsers className="w-8 h-8 text-green-500" />}
            to="/authors"
          />
        </div>
      </div>
    </>
  );
}
