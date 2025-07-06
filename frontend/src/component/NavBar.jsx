import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const NavLog = () => {
  const { usuario, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Estacionamiento</h1>
      {usuario ? (
        <div>
          <span className="mr-4">Hola, {usuario.nombre}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div>
          {/* Enlaces a login/register o lo que tengas */}
        </div>
      )}
    </nav>
  );
};

export default NavLog;
