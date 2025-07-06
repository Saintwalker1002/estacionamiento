// UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Inicializamos con lo que haya en localStorage (o null)
  const [usuario, setUsuario] = useState(() => {
    const userStorage = localStorage.getItem('usuario');
    return userStorage ? JSON.parse(userStorage) : null;
  });

  // Cuando usuario cambie, sincronizamos con localStorage
  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);

  // Función para hacer login (guardar usuario)
  const login = (userData) => {
    setUsuario(userData);
  };

  // Función para logout (borrar usuario)
  const logout = () => {
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
