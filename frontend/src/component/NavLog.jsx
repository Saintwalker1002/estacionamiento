import { Link } from 'react-router-dom';

function NavLog() {
  return (
    <nav className="bg-blue-900 p-4 flex items-center justify-between">
      <div className="text-white font-bold text-xl">Logo</div>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default NavLog;
