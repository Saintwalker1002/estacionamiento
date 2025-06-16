import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <Router>
      <nav className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
        <div className="text-xl font-semibold tracking-wide">
          Estacionamientos Empresariales
        </div>
        <div className="space-x-6 text-sm">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/login" className="hover:underline">Iniciar sesión</Link>
          <Link to="/perfil" className="hover:underline">Perfil</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default App;
