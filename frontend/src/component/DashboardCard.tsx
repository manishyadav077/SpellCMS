import { Link } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

const DashboardCard = ({
  title,
  description,
  icon,
  to,
}: DashboardCardProps) => {
  return (
    <Link
      to={to}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-200"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-100 dark:bg-slate-700 p-2 rounded-xl">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          {title}
        </h2>
      </div>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </Link>
  );
};

export default DashboardCard;
