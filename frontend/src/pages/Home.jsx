import Header from '../component/NavBar';

function Home() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Header arriba */}
      <Header />

      {/* Contenido centrado vertical y horizontalmente */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">
            Bienvenido a Estacionamientos Empresariales
          </h1>
          <p className="text-lg text-gray-700">
            Reserva tu espacio de estacionamiento de forma rápida y segura.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

