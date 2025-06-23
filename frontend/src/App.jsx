import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Reserva from './pages/Reserva';
import CancelarReservas from './pages/CancelarReservas';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="Register" element={<Register />} />
        <Route path="/Reserva" element={<Reserva />} />
        <Route path="/cancelar" element={<CancelarReservas />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  )
}

export default App;
