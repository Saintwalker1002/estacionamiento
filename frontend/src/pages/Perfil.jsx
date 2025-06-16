// Página de perfil del usuario
function Perfil() {
  return (
    // Fondo blanco, contenido centrado en pantalla
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Tarjeta de perfil con fondo gris claro */}
      <div className="bg-gray-100 p-8 rounded shadow-lg max-w-md w-full">
        {/* Título de la sección */}
        <h2 className="text-2xl font-semibold mb-4 text-blue-800 text-center">
          Mi Perfil
        </h2>

        {/* Datos del perfil del usuario (simulados por ahora) */}
        <div className="space-y-2 text-gray-700">
          <p><strong>Nombre:</strong> Diego Rivera</p>
          <p><strong>Correo:</strong> diego@empresa.com</p>
          <p><strong>Reservas activas:</strong> 2</p>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
