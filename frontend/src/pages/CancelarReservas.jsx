import React from 'react';
import { useReserva } from '../context/ReservaContext';
import Header from '../component/NavBar';

const CancelarReservas = () => {
  const { espacios, cancelarReserva } = useReserva();

  const reservados = espacios.filter(e => e.status === 'reservado');

  return (
    <div className="min-h-screen bg-red-100">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-6">Cancelar Reservas</h1>

        {reservados.length === 0 ? (
          <p className="text-center text-gray-600">No hay reservas activas.</p>
        ) : (
          <div className="grid gap-4">
            {reservados.map((esp) => (
              <div
                key={esp.id}
                className="flex justify-between items-center border border-black p-4 rounded bg-white shadow"
              >
                <div>
                  <p><strong>Espacio:</strong> #{esp.id}</p>
                  <p><strong>RUT:</strong> {esp.data?.rut?.cuerpo}-{esp.data?.rut?.dv}</p>
                  <p><strong>Patente:</strong> {esp.data?.patente?.parte1}{esp.data?.patente?.parte2}{esp.data?.patente?.parte3}</p>
                  <p><strong>Fecha:</strong> {esp.data?.birthdate} — <strong>Hora:</strong> {esp.data?.horas}</p>
                </div>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => cancelarReserva(esp.id)}
                >
                  Cancelar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelarReservas;
