import React, { useState } from 'react';
import HeaderLog from '../component/NavBar';

const totalEspacios = 12;

const Reserva = () => {
  // Estado de los espacios de estacionamiento.
  const [espacios, setEspacios] = useState(
    Array.from({ length: totalEspacios }, (_, i) => ({
      id: i + 1,
      status: 'disponible', // Puede ser 'disponible', 'reservado' u 'ocupado'
    }))
  );

  // Estado para mostrar un mensaje cuando se reserva
  const [mensaje, setMensaje] = useState('');

  // Estado para el modal y la reserva actual
  const [modalAbierto, setModalAbierto] = useState(false);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
  const [birthdate, setBirthdate] = useState('');
  const [horas, setHoras] = useState('');
  const [patente, setPatente] = useState('');
  const [rut, setRut] = useState('');

  // Función para abrir el modal y establecer el espacio a reservar
  const abrirModal = (id) => {
    setEspacioSeleccionado(id);
    setModalAbierto(true);
  };

  // Función para cerrar el modal y limpiar el formulario
  const cerrarModal = () => {
    setModalAbierto(false);
    setEspacioSeleccionado(null);
    setHoras('');
    setPatente('');
    setRut('');
  };

  // Función para reservar (al enviar el formulario)
  const manejarReserva = (e) => {
    e.preventDefault();
    // Aquí puedes agregar validaciones adicionales o llamar a un API.

    // Actualiza el estado del espacio a "reservado"
    setEspacios(prev =>
      prev.map(esp =>
        esp.id === espacioSeleccionado
          ? { ...esp, status: 'reservado' }
          : esp
      )
    );
    setMensaje(`Has reservado el espacio #${espacioSeleccionado}`);
    cerrarModal();
  };

  // Función para definir el color del recuadro según el estado
  const getColor = (status) => {
    switch (status) {
      case 'disponible': return 'bg-blue-400 hover:bg-blue-500 cursor-pointer';
      case 'reservado': return 'bg-yellow-400 cursor-not-allowed';
      case 'ocupado': return 'bg-red-500 cursor-not-allowed';
      default: return 'bg-gray-300';
    }
  };

  return (
  <div className="min-h-screen bg-blue-100">
    <header className="relative z-20">
      <HeaderLog />
    </header>

    {/* Wrapper para centrar el contenido */}
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] p-6">
      <div className="bg-white border-4 border-blue-500 p-10 rounded-lg shadow-xl w-full max-w-4xl grid gap-6">
        <h1 className="text-3xl font-bold text-center text-blue-800">Reserva de Estacionamiento</h1>
        <p className="text-center text-gray-700">Haz clic en un espacio azul para reservarlo</p>

        {mensaje && <p className="text-center text-blue-700 font-semibold">{mensaje}</p>}

        <div className="grid grid-cols-4 gap-4 mt-4">
          {espacios.map((esp) => (
            <div
              key={esp.id}
              className={`w-full aspect-square rounded-xl flex items-center justify-center text-white font-bold text-xl transition ${getColor(esp.status)}`}
              onClick={() => esp.status === 'disponible' && abrirModal(esp.id)}
            >
              {esp.id}
            </div>
          ))}
        </div>

        {/* Leyenda de estados */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 bg-blue-400 rounded" /> <span>Disponible</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 bg-yellow-400 rounded" /> <span>Reservado</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 bg-red-500 rounded" /> <span>Ocupado</span>
          </div>
        </div>
      </div>
    </div>

    {/* Modal... */}

      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-800 text-center">Reservar Espacio #{espacioSeleccionado}</h2>
            <form onSubmit={manejarReserva} className="grid gap-4">
              <input
                type="date"
                className="p-3 border rounded"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
              <input
                type="time"
                placeholder="Horas a ocupar (ej. 9:00-12:00)"
                className="p-3 border rounded"
                value={horas}
                onChange={(e) => setHoras(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Patente del auto"
                className="p-3 border rounded"
                value={patente}
                onChange={(e) => setPatente(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="RUT"
                className="p-3 border rounded"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                required
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                >
                  Confirmar Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserva;
