import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Reserva from './pages/Reserva';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import HomeEstacionamiento from './pages/HomeEstacionamiento';
import RutaPrivada from './component/RutaPrivada';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeEstacionamiento />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reserva" element={<RutaPrivada><Reserva /></RutaPrivada>} />
          <Route path="/home" element={<RutaPrivada><Home /></RutaPrivada>} />
          <Route path="/perfil" element={<RutaPrivada><Perfil /></RutaPrivada>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
