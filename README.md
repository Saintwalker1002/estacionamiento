# Aplicación de Reservas de Estacionamiento Empresarial

## Descripción

Esta aplicación web permite a los usuarios registrarse, iniciar sesión y reservar espacios de estacionamiento para un día y hora específicos. Además, pueden visualizar el estado actual del estacionamiento, consultar sus reservas activas y cancelarlas si lo desean.

---

## Cómo ingresar a la aplicación

1. **Iniciar el backend**

   - Asegúrate de tener MongoDB corriendo en tu máquina.
   - Desde la carpeta `backend`, ejecuta:
   
   ```
   npm install
   node index.js
- El servidor correrá en: http://localhost:3000

2. **Iniciar el frontend**

   - Desde la carpeta `frontend`, ejecuta:

   ```
   npm install
   npm start
El frontend correrá en: http://localhost:3001 (o el puerto que configure React)

3. **Abrir la aplicación**

Abre tu navegador y visita:

http://localhost:3001


# Funcionalidades que se pueden probar
## Registro de usuario
Los usuarios pueden crear una cuenta ingresando sus datos personales (nombre, apellidos, RUT, correo, teléfono, patente, fecha de nacimiento y contraseña).

## Inicio de sesión
Los usuarios registrados pueden ingresar con su RUT y contraseña.

## Visualización del estado del estacionamiento
En la página principal (HomeEstacionamiento o Home), se muestra el estado actual de los 12 espacios de estacionamiento (disponible, reservado, ocupado).

## Reserva de espacio de estacionamiento
Desde la página Reserva, los usuarios pueden seleccionar un espacio disponible, elegir fecha y hora, e ingresar patente y RUT para reservar.

## Visualización de reservas del día
En Home se pueden ver todas las reservas activas para el día actual, hechas por todos los usuarios.

## Visualización y cancelación de reservas propias
En la página Perfil, el usuario puede ver sus reservas activas y cancelarlas si lo desea.

## Protección de rutas
Las páginas Reserva, Home y Perfil están protegidas para usuarios autenticados; de lo contrario, se redirige a Login.

# Roles o usuarios habilitados
## Usuario registrado

Puede hacer reservas, visualizar sus reservas y cancelar.

Puede ver el estado general del estacionamiento y reservas de todos los usuarios para el día actual.

## Usuario no registrado

Solo puede acceder a las páginas públicas: HomeEstacionamiento, Register y Login.

No puede hacer reservas ni acceder a datos privados.

Actualmente no hay roles diferenciados (como administrador); todos los usuarios registrados tienen las mismas capacidades.

# Notas
La aplicación usa React en frontend, Express.js y MongoDB en backend.

Para la autenticación se utiliza el almacenamiento local (localStorage) y Context API (UserContext).

La conexión a la base de datos MongoDB debe estar activa para que el backend funcione correctamente.
