import React, { useEffect, useState } from 'react';
import Header from '../component/NavBar';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const Reserva = () => {
  const { usuario } = useUser();
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [espacio, setEspacio] = useState('');
  const [reservasDelDia, setReservasDelDia] = useState([]);

  const handleReservar = async (e) => {
    e.preventDefault();
    if (!fecha || !hora || !espacio) return;

    try {
      await axios.post('http://localhost:3000/api/reservas', {
        fecha,
        hora,
        espacioId: parseInt(espacio),
        rut: usuario.rut,
        patente: usuario.patente
      });
      alert('Reserva realizada con éxito');
      fetchReservasDelDia(fecha); // Recarga reservas para mostrar
    } catch (error) {
      console.error('Error al reservar:', error);
      alert('Error al reservar');
    }
  };

  const fetchReservasDelDia = async (fechaBuscada) => {
    try {
      const res = await axios.get('http://localhost:3000/api/reservas');
      const filtradas = res.data.filter(r => r.fecha === fechaBuscada && r.rut !== usuario.rut);
      setReservasDelDia(filtradas);
    } catch (error) {
      console.error('Error al obtener reservas del día:', error);
    }
  };

  useEffect(() => {
    if (fecha) {
      fetchReservasDelDia(fecha);
    }
  }, [fecha]);

  return (
    <div className="min-h-screen bg-blue-100">
      <Header />

      <main className="max-w-3xl mx-auto p-6 bg-white mt-8 rounded shadow border border-blue-300">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">Reservar un espacio</h1>

        <form onSubmit={handleReservar} className="grid gap-4">
          <label>Fecha:</label>
          <input
            type="date"
            className="p-2 border rounded"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          <label>Hora:</label>
          <input
            type="time"
            className="p-2 border rounded"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />

          <label>Espacio a reservar (1 al 12):</label>
          <input
            type="number"
            min="1"
            max="12"
            className="p-2 border rounded"
            value={espacio}
            onChange={(e) => setEspacio(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reservar
          </button>
        </form>

        {reservasDelDia.length > 0 && (
          <div className="mt-8 bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Reservas hechas por otros usuarios ese día</h2>
            <ul className="space-y-2">
              {reservasDelDia.map((reserva, index) => (
                <li key={index} className="border-b pb-2 text-gray-700">
                  <strong>Espacio:</strong> {reserva.espacioId} — <strong>Hora:</strong> {reserva.hora}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Reserva;
