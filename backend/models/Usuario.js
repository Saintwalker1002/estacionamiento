const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  rut: String,
  correo: String, 
  patente: {
    parte1: String,
    parte2: String,
    parte3: String,
  },
  birthdate: String,
  password: String,
  telefono: {
    type: String,
    required: true,
    match: [/^\+569\d{8}$/, 'Número de teléfono inválido'],
  },

});

module.exports = mongoose.model('Usuario', usuarioSchema);
