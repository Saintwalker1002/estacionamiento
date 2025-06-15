import React, { createContext, useState, useContext } from 'react';

const ReservaContext = createContext();

export const useReserva = () => useContext(ReservaContext);

export const ReservaProvider = ({ children }) => {
  const totalEspacios = 12;
  const [espacios, setEspacios] = useState(
    Array.from({ length: totalEspacios }, (_, i) => ({
      id: i + 1,
      status: 'disponible', // 'disponible', 'reservado', 'ocupado'
      data: null // aquí se puede guardar rut, fecha, hora, patente
    }))
  );

  const reservarEspacio = (id, data) => {
    setEspacios(prev =>
      prev.map(esp =>
        esp.id === id ? { ...esp, status: 'reservado', data } : esp
      )
    );
  };

  const cancelarReserva = (id) => {
    setEspacios(prev =>
      prev.map(esp =>
        esp.id === id ? { ...esp, status: 'disponible', data: null } : esp
      )
    );
  };

  return (
    <ReservaContext.Provider value={{ espacios, reservarEspacio, cancelarReserva }}>
      {children}
    </ReservaContext.Provider>
  );
};
