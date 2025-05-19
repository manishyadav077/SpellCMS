import { useNavigate, useLocation } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";

interface BackButtonProps {
  fallbackPath?: string;
}

export default function BackButton({ fallbackPath = "/" }: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
    >
      <FaBackspace className="w-7 h-7" />
      <span className="sr-only">Go back</span>
    </button>
  );
}
