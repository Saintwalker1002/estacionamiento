import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ReservaContext = createContext();
export const useReserva = () => useContext(ReservaContext);

export const ReservaProvider = ({ children }) => {
  const totalEspacios = 12;
  const [espacios, setEspacios] = useState(
    Array.from({ length: totalEspacios }, (_, i) => ({
      id: i + 1,
      status: 'disponible',
      data: null
    }))
  );

  // Cargar reservas existentes desde el backend al iniciar
  useEffect(() => {
    axios.get('http://localhost:3000/api/reservas')
      .then(response => {
        const reservas = response.data;
        const nuevosEspacios = espacios.map(espacio => {
          const reserva = reservas.find(r => r.espacioId === espacio.id);
          return reserva
            ? { ...espacio, status: 'reservado', data: reserva }
            : espacio;
        });
        setEspacios(nuevosEspacios);
      })
      .catch(error => {
        console.error('Error al obtener reservas:', error);
      });
  }, []);

  // Función para reservar un espacio
  const reservarEspacio = async (id, data) => {
    try {
      const nuevaReserva = {
        espacioId: id,
        fecha: data.birthdate,
        hora: data.horas,
        patente: data.patente,
        rut: data.rut
      };

      // Guardar en backend
      const response = await axios.post('http://localhost:3000/api/reservas', nuevaReserva);

      // Actualizar estado local
      setEspacios(prev =>
        prev.map(esp =>
          esp.id === id
            ? { ...esp, status: 'reservado', data: response.data }
            : esp
        )
      );
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };

  // Función para cancelar (no implementa borrado en backend aún)
  const cancelarReserva = async (id) => {
    try {
      // Lógica para obtener la ID del documento de MongoDB
      const reserva = espacios.find(e => e.id === id && e.data?._id);
      if (!reserva) return;

      await axios.delete(`http://localhost:3000/api/reservas/${reserva.data._id}`);

      // Eliminar del estado local
      setEspacios(prev =>
        prev.map(esp =>
          esp.id === id ? { ...esp, status: 'disponible', data: null } : esp
        )
      );
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
    }
  };

  return (
    <ReservaContext.Provider value={{ espacios, reservarEspacio, cancelarReserva }}>
      {children}
    </ReservaContext.Provider>
  );
};
