import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Reserva from './pages/Reserva';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Reserva" element={<Reserva />} />
      </Routes>
    </Router>
  )
}

export default App
