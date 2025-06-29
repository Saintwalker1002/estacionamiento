const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  espacioId: Number,
  fecha: String,
  hora: String,
  patente: {
    parte1: String,
    parte2: String,
    parte3: String,
  },
  rut: {
    cuerpo: String,
    dv: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Reserva', reservaSchema);
