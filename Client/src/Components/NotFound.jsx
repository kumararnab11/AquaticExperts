import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-9xl font-bold text-teal-500">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">Oops! Page not found</h2>
      <p className="text-gray-600 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
