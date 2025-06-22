// Página de inicio de la aplicación
function Home() {
  return (
    // Contenedor que ocupa toda la altura de la pantalla, centrado vertical y horizontalmente
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      {/* Contenido centrado */}
      <div className="text-center px-4">
        {/* Título principal */}
        <h1 className="text-4xl font-bold mb-4 text-blue-900">
          Bienvenido a Estacionamientos Empresariales
        </h1>

        {/* Subtítulo o mensaje de presentación */}
        <p className="text-lg text-gray-700">
          Reserva tu espacio de estacionamiento de forma rápida y segura.
        </p>
      </div>
    </div>
  );
}

export default Home;
