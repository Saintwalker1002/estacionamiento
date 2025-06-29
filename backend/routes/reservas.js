const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

// Crear una nueva reserva
router.post('/', async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar la reserva' });
  }
});

// Cancelar (eliminar) una reserva por ID
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await Reserva.findByIdAndDelete(req.params.id);
    if (!resultado) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva cancelada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al cancelar reserva' });
  }
});

module.exports = router;

