function Perfil() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
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
  );
}

export default Perfil;
