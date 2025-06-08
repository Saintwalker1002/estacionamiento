import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const success = register(name, email, password, birthdate);
    if (success) {
      navigate('/');
    } else {
      setError('El correo ya está registrado.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white border-4 border-blue-500 p-10 rounded-lg shadow-xl w-full max-w-md grid gap-6">
        <h1 className="text-3xl font-bold text-center text-blue-800">Registro</h1>

        <form onSubmit={handleRegister} className="grid gap-4">
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="p-3 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="date"
            className="p-3 border rounded"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;