import React, { useEffect, useState } from 'react';
import Header from '../component/NavLog';
import axios from 'axios';

function HomeEstacionamiento() {
  const [reservas, setReservas] = useState([]);
  const [fechaActual, setFechaActual] = useState('');
  const espaciosTotales = 12;

  useEffect(() => {
    const hoy = new Date().toISOString().split('T')[0];
    setFechaActual(hoy);

    axios.get('http://localhost:3000/api/reservas')
      .then(res => {
        const reservasHoy = res.data.filter(r => r.fecha === hoy);
        setReservas(reservasHoy);
      })
      .catch(err => console.error('Error al obtener reservas:', err));
  }, []);

  const espaciosOcupados = reservas.map(r => r.espacioId);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
      <Header />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center px-4 py-8 space-y-8">

        {/* Título bienvenida */}
        <h1 className="text-4xl font-bold text-blue-900 text-center">
          Bienvenido a Estacionamientos Empresariales
        </h1>

        {/* Contenedor principal dividido en dos columnas */}
        <div className="flex flex-row w-full max-w-7xl gap-6">

          {/* Columna izquierda: explicación + estado */}
          <div className="flex flex-col w-2/3 gap-6">

            {/* Explicación */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-300 text-center">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">¿Qué puedes hacer aquí?</h2>
              <p className="text-lg text-gray-700">
                Esta plataforma te permite:
              </p>
              <ul className="list-disc text-left pl-8 mt-2 text-gray-700 text-lg">
                <li>Visualizar el estado actual del estacionamiento.</li>
                <li>Reservar espacios disponibles según tu necesidad.</li>
                <li>Cancelar reservas si cambias de opinión.</li>
              </ul>
            </div>

            {/* Estado del estacionamiento */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-300">
              <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
                Estado del estacionamiento – {fechaActual}
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: espaciosTotales }, (_, index) => {
                  const numero = index + 1;
                  const ocupado = espaciosOcupados.includes(numero);
                  return (
                    <div
                      key={numero}
                      className={`p-4 rounded text-white font-bold text-center shadow ${ocupado ? 'bg-yellow-500' : 'bg-green-500'}`}
                    >
                      Espacio {numero}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna derecha: reservas del día */}
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-md border border-red-300 overflow-y-auto max-h-[650px]">
            <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">Reservas de Hoy</h2>
            {reservas.length === 0 ? (
              <p className="text-center text-gray-600">No hay reservas para hoy.</p>
            ) : (
              <ul className="space-y-2">
                {reservas.map((reserva, index) => (
                  <li key={index} className="text-lg text-gray-800 border-b border-gray-200 pb-1">
                    <strong>Espacio:</strong> {reserva.espacioId} <br />
                    <strong>Hora:</strong> {reserva.hora}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomeEstacionamiento;
