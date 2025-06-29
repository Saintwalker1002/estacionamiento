import { useNavigate, Link } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('usuario'); // Elimina el usuario del almacenamiento local
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige a la página de inicio o login
  };

  return (
    <nav className="bg-blue-900 p-4 flex items-center justify-between">
      <div className="text-white font-bold text-xl">Logo</div>
      <div className="flex space-x-4">
        <button onClick={handleLogout} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition">
          Logout
        </button>
        <Link to="/Home" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition">
          Home
        </Link>
        <Link to="/Reserva" className="bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition">
          Reservas
        </Link>
        <Link to="/Perfil" className="bg-purple-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition">
          Perfil
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
