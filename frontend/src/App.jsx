import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Reserva from './pages/Reserva';
import CancelarReservas from './pages/CancelarReservas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Reserva" element={<Reserva />} />
        <Route path="/cancelar" element={<CancelarReservas />} />
      </Routes>
    </Router>
  )
}

export default App
