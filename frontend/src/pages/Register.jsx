import React, { useEffect, useState } from 'react';
import Header from '../component/NavBar';
import { useUser } from '../context/UserContext';

const totalEspacios = 12;

const Reserva = () => {
  const { user } = useUser();
  const [espacios, setEspacios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
  const [birthdate, setBirthdate] = useState('');
  const [horas, setHoras] = useState('');
  const [errorTiempo, setErrorTiempo] = useState('');
  const [reservasMismoDia, setReservasMismoDia] = useState([]);

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
    setMensaje('');
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEspacioSeleccionado(null);
    setHoras('');
    setBirthdate('');
    setErrorTiempo('');
    setReservasMismoDia([]);
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
      patente: user?.patente || {},
      rut: user?.rut || '',
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

  const cargarReservasDelDia = async (fecha) => {
    try {
      const res = await fetch('http://localhost:3000/api/reservas');
      const data = await res.json();
      const filtradas = data.filter(r => r.fecha === fecha && r.rut?.cuerpo !== user?.rut?.cuerpo);
      setReservasMismoDia(filtradas);
    } catch (err) {
      console.error('Error al obtener reservas del día:', err);
    }
  };

  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    setBirthdate(nuevaFecha);
    if (nuevaFecha) {
      cargarReservasDelDia(nuevaFecha);
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
                  onChange={handleFechaChange}
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

              <div className="flex justify-between mt-4">
                <button type="button" onClick={cerrarModal}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition">Cancelar</button>
                <button type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">Confirmar Reserva</button>
              </div>
            </form>

            {/* Mostrar reservas de otros usuarios para la fecha seleccionada */}
            {reservasMismoDia.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Reservas existentes para esta fecha:</h3>
                <ul className="mt-2 text-gray-700 text-sm list-disc list-inside">
                  {reservasMismoDia.map((r, i) => (
                    <li key={i}>
                      Espacio #{r.espacioId} — {r.hora} — {r.rut?.cuerpo}-{r.rut?.dv}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserva;
