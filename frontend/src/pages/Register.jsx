import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderLog from '../component/NavLog';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [rut, setRut] = useState('');
  const [patente, setPatente] = useState({ parte1: '', parte2: '', parte3: '' });
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('+569');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/register', {
        nombre,
        apellidos,
        rut,
        correo,
        telefono,
        patente,
        birthdate,
        password,
      });

      if (res.status === 201) {
        localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
        navigate('/reserva');
      }
    } catch (err) {
      setError('Error al registrar usuario.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <header>
        <HeaderLog />
      </header>

      <main className="flex items-center justify-center py-10 px-4">
        <div className="bg-white border-4 border-blue-500 p-10 rounded-lg shadow-xl w-full max-w-md grid gap-6">
          <h1 className="text-3xl font-bold text-center text-blue-800">Registro</h1>

          <form onSubmit={handleRegister} className="grid gap-4">

            <label className="text-sm font-semibold text-gray-700">Nombre completo</label>
            <input
              type="text"
              className="p-3 border border-black rounded"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label className="text-sm font-semibold text-gray-700">Apellidos</label>
            <input
              type="text"
              className="p-3 border border-black rounded"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />

            <label className="text-sm font-semibold text-gray-700">RUT (ej: 12345678-9)</label>
            <input
              type="text"
              className="p-3 border border-black rounded"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              required
            />

            <label className="text-sm font-semibold text-gray-700">Correo electrónico</label>
            <input
              type="email"
              className="p-3 border border-black rounded"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <label className="text-sm font-semibold text-gray-700">Teléfono</label>
            <input
              type="tel"
              className="p-3 border border-black rounded"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              pattern="^\+569\d{8}$"
              title="Debe comenzar con +569 y tener 8 dígitos después"
              required
            />

            <label className="text-sm font-semibold text-gray-700">Patente (ej: AB·CD·12)</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                maxLength={3}
                className="p-3 border border-black rounded text-center"
                placeholder="AB"
                value={patente.parte1}
                onChange={(e) => setPatente({ ...patente, parte1: e.target.value.toUpperCase() })}
                required
              />
              <input
                type="text"
                maxLength={3}
                className="p-3 border border-black rounded text-center"
                placeholder="CD"
                value={patente.parte2}
                onChange={(e) => setPatente({ ...patente, parte2: e.target.value.toUpperCase() })}
                required
              />
              <input
                type="text"
                maxLength={3}
                className="p-3 border border-black rounded text-center"
                placeholder="12"
                value={patente.parte3}
                onChange={(e) => setPatente({ ...patente, parte3: e.target.value.toUpperCase() })}
                required
              />
            </div>

            <label className="text-sm font-semibold text-gray-700">Fecha de nacimiento</label>
            <input
              type="date"
              className="p-3 border border-black rounded"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
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

            <label className="text-sm font-semibold text-gray-700">Confirmar contraseña</label>
            <input
              type="password"
              className="p-3 border border-black rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
            >
              Registrarse
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;