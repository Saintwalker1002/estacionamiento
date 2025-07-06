import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../component/NavBar';
import { useUser } from '../context/UserContext';

const Perfil = () => {
  const { usuario } = useUser();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservas = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/reservas');
      const reservasUsuario = res.data.filter(
        (r) => `${r.rut?.cuerpo}-${r.rut?.dv}` === usuario?.rut
      );
      setReservas(reservasUsuario);
    } catch (err) {
      console.error('Error al obtener las reservas:', err);
    } finally {
      setLoading(false);
    }
  };

  const cancelarReserva = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/reservas/${id}`);
      setReservas(reservas.filter((r) => r._id !== id));
    } catch (err) {
      console.error('Error al cancelar la reserva:', err);
    }
  };

  useEffect(() => {
    if (usuario) {
      fetchReservas();
    }
  }, [usuario]);

  return (
    <div className="min-h-screen bg-red-100">
      <Header />
      <div className="max-w-6xl mx-auto p-8 flex flex-col gap-6 md:flex-row">
        <div className="flex-1 bg-white border border-blue-600 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Tus Datos</h2>
          <p><strong>Nombre:</strong> {usuario?.nombre} {usuario?.apellidos}</p>
          <p><strong>RUT:</strong> {usuario?.rut}</p>
          <p><strong>Correo:</strong> {usuario?.correo}</p>
          <p><strong>Teléfono:</strong> {usuario?.telefono}</p>
          <p><strong>Patente:</strong> {usuario?.patente?.parte1}{usuario?.patente?.parte2}{usuario?.patente?.parte3}</p>
          <p><strong>Fecha de nacimiento:</strong> {usuario?.birthdate}</p>
        </div>

        <div className="flex-1 bg-white border border-blue-600 shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-600 text-center mb-4">Cancelar Reservas</h1>

          {loading ? (
            <p className="text-center text-gray-600">Esperando reservas...</p>
          ) : reservas.length === 0 ? (
            <p className="text-center text-gray-600">No hay reservas activas.</p>
          ) : (
            <div className="grid gap-4">
              {reservas.map((r) => (
                <div
                  key={r._id}
                  className="flex justify-between items-center border border-black p-4 rounded bg-white shadow"
                >
                  <div>
                    <p><strong>Espacio:</strong> #{r.espacioId}</p>
                    <p><strong>RUT:</strong> {r.rut?.cuerpo}-{r.rut?.dv}</p>
                    <p><strong>Patente:</strong> {r.patente?.parte1}{r.patente?.parte2}{r.patente?.parte3}</p>
                    <p><strong>Fecha:</strong> {r.fecha} — <strong>Hora:</strong> {r.hora}</p>
                  </div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => cancelarReserva(r._id)}
                  >
                    Cancelar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
