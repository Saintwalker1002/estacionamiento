// Página de inicio de sesión (login)
function Login() {
  return (
    // Fondo gris claro, centrado en pantalla
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Contenedor del formulario */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        {/* Título del formulario */}
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Iniciar sesión
        </h2>

        {/* Formulario de login */}
        <form className="flex flex-col gap-4">
          {/* Campo para ingresar el correo */}
          <input
            type="text"
            placeholder="Correo electrónico"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Campo para ingresar la contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            className="bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
