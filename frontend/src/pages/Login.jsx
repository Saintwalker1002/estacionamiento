import HeaderLog from '../component/NavLog';

function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header fijo arriba */}
      <HeaderLog />

      {/* Contenido centrado */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
            Iniciar sesión
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Correo electrónico"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
