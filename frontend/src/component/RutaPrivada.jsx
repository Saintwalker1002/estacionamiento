import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const RutaPrivada = ({ children }) => {
  const { usuario } = useUser();

  return usuario ? children : <Navigate to="/login" />;
};

export default RutaPrivada;
