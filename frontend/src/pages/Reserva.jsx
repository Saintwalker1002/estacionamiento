import React, { useEffect, useState } from 'react';
import Header from '../component/NavBar';

const totalEspacios = 12;

const Reserva = () => {
  const [espacios, setEspacios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
  const [birthdate, setBirthdate] = useState('');
  const [horas, setHoras] = useState('');
  const [errorTiempo, setErrorTiempo] = useState('');
  const [patente, setPatente] = useState({ parte1: '', parte2: '', parte3: '' });
  const [rut, setRut] = useState({ cuerpo: '', dv: '' });

  // Obtener reservas del backend al cargar
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/reservas');
        const data = await res.json();
        const espaciosGenerados = Array.from({ length: totalEspacios }, (_, i) => {
          const reserva = data.find(r => r.espacioId === i + 1);
          return {
            id: i + 1,
            status: reserva ? 'reservado' : 'disponible',
            data: reserva || null,
          };
        });
        setEspacios(espaciosGenerados);
      } catch (err) {
        console.error('Error al cargar reservas:', err);
      }
    };

    fetchReservas();
  }, []);

  const abrirModal = (id) => {
    setEspacioSeleccionado(id);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEspacioSeleccionado(null);
    setHoras('');
    setPatente({ parte1: '', parte2: '', parte3: '' });
    setRut({ cuerpo: '', dv: '' });
    setBirthdate('');
    setErrorTiempo('');
  };

  const manejarReserva = async (e) => {
    e.preventDefault();

    const fechaHoraSeleccionada = new Date(`${birthdate}T${horas}`);
    const fechaHoraActual = new Date();

    if (fechaHoraSeleccionada <= fechaHoraActual) {
      setErrorTiempo('No puedes reservar una fecha y hora pasada.');
      return;
    }

    const reserva = {
      espacioId: espacioSeleccionado,
      fecha: birthdate,
      hora: horas,
      patente,
      rut,
    };

    try {
      const res = await fetch('http://localhost:3000/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reserva),
      });

      if (res.ok) {
        setMensaje(`Has reservado el espacio #${espacioSeleccionado}`);

        setEspacios(prev =>
          prev.map(esp =>
            esp.id === espacioSeleccionado
              ? { ...esp, status: 'reservado', data: reserva }
              : esp
          )
        );

        cerrarModal();
      } else {
        const err = await res.json();
        alert('Error al reservar: ' + err.error);
      }
    } catch (err) {
      console.error('Error al enviar reserva:', err);
    }
  };

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
      <Header />

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

          {/* Leyenda */}
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

      {/* Modal de reserva */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-800 text-center">Reservar Espacio #{espacioSeleccionado}</h2>
            <form onSubmit={manejarReserva} className="grid gap-4">

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1">Fecha de reserva</label>
                <input
                  type="date"
                  className="p-3 border border-black rounded w-full"
                  min={new Date().toISOString().split("T")[0]}
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1">Hora</label>
                <input
                  type="time"
                  className="p-3 border border-black rounded w-full"
                  value={horas}
                  onChange={(e) => setHoras(e.target.value)}
                  required
                />
                {errorTiempo && <p className="text-red-600 text-sm">{errorTiempo}</p>}
              </div>

              {/* Patente */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Patente</label>
                <div className="grid grid-cols-3 gap-2">
                  {['parte1', 'parte2', 'parte3'].map((parte, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={3}
                      className="p-3 border border-black rounded text-center uppercase"
                      placeholder={['AB', 'CD', '12'][idx]}
                      value={patente[parte]}
                      onChange={(e) => setPatente({ ...patente, [parte]: e.target.value.toUpperCase() })}
                      required
                    />
                  ))}
                </div>
              </div>

              {/* RUT */}
              <div>
                <label className="text-sm font-semibold text-gray-700">RUT</label>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    className="p-3 border border-black rounded col-span-2"
                    placeholder="12345678"
                    value={rut.cuerpo}
                    onChange={(e) => setRut({ ...rut, cuerpo: e.target.value.replace(/[^0-9]/g, '') })}
                    required
                  />
                  <input
                    type="text"
                    maxLength={1}
                    className="p-3 border border-black rounded text-center"
                    placeholder="9/K"
                    value={rut.dv}
                    onChange={(e) => setRut({ ...rut, dv: e.target.value.replace(/[^0-9kK]/g, '').toUpperCase() })}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button type="button" onClick={cerrarModal}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition">Cancelar</button>
                <button type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">Confirmar Reserva</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserva;

