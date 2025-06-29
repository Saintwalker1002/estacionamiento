const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const Usuario = require('./models/Usuario');
const bcrypt = require('bcrypt');
const reservasRouter = require('./routes/reservas');
const Reserva = require('./models/Reserva');

// Middleware
app.use(express.json()); // ✅ Primero parsea el JSON
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/api/reservas', reservasRouter); // ✅ Después registra las rutas

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/reservasDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado a MongoDB');
}).catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err.message);
});

// Rutas

// Test de conexión
app.get('/api/test', (req, res) => {
  res.json({ message: 'Servidor backend funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

// Eliminar reserva por ID de MongoDB
app.delete('/api/reservas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Reserva.findByIdAndDelete(id);
    res.status(200).json({ message: 'Reserva eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la reserva', error: err.message });
  }
});

app.post('/api/register', async (req, res) => {
  const { nombre, apellidos, rut, patente, birthdate, correo, telefono, password } = req.body;

  try {
    const existente = await Usuario.findOne({ rut });
    if (existente) {
      return res.status(409).json({ message: 'El RUT ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      apellidos,
      rut,
      correo,
      telefono,
      patente,
      birthdate,
      password: hashedPassword,
    });

    await nuevoUsuario.save();
    res.status(201).json({
      message: 'Usuario registrado correctamente',
      usuario: {
        nombre: nuevoUsuario.nombre,
        apellidos: nuevoUsuario.apellidos,
        rut: nuevoUsuario.rut,
        correo: nuevoUsuario.correo,
        telefono: nuevoUsuario.telefono,
        patente: nuevoUsuario.patente,
        birthdate: nuevoUsuario.birthdate
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { rut, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ rut });
    if (!usuario) return res.status(401).json({ message: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    res.status(200).json({
      message: 'Login exitoso',
      usuario: {
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        rut: usuario.rut,
        patente: usuario.patente,
        birthdate: usuario.birthdate
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

