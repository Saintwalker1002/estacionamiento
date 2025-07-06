import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (usuarioData) => {
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
    setUsuario(usuarioData);
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
