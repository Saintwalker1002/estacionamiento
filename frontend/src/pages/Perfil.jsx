import Header from '../component/NavBar';

// Página de perfil del usuario
function Perfil() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header arriba */}
      <Header />

      {/* Contenido centrado debajo del header */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-gray-100 p-8 rounded shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 text-center">
            Mi Perfil
          </h2>

          <div className="space-y-2 text-gray-700">
            <p><strong>Nombre:</strong> Diego Rivera</p>
            <p><strong>Correo:</strong> diego@empresa.com</p>
            <p><strong>Reservas activas:</strong> 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;

