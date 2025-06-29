import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderLog from '../component/NavLog';

const Login = () => {
  const navigate = useNavigate();
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/login', {
        rut,
        password
      });

      if (res.status === 200) {
        const userData = res.data.usuario;
        localStorage.setItem('usuario', JSON.stringify(userData)); // ← Aquí guardamos los datos
        navigate('/reserva');
      }
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'RUT o contraseña incorrectos.'
          : 'Error de conexión al servidor.'
      );
    }
  };


  return (
    <div className="min-h-screen bg-blue-100">
      <header>
        <HeaderLog />
      </header>

      <main className="flex items-center justify-center py-10 px-4">
        <div className="bg-white border-4 border-blue-500 p-10 rounded-lg shadow-xl w-full max-w-md grid gap-6">
          <h1 className="text-3xl font-bold text-center text-blue-800">Iniciar Sesión</h1>

          <form onSubmit={handleLogin} className="grid gap-4">
            <label className="text-sm font-semibold text-gray-700">RUT</label>
            <input
              type="text"
              placeholder="12345678-9"
              className="p-3 border border-black rounded"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              required
            />

            <label className="text-sm font-semibold text-gray-700">Contraseña</label>
            <input
              type="password"
              className="p-3 border border-black rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;

