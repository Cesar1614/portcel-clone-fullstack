// controllers/barcoController.js
const Barco = require('../models/Barco');

exports.obtenerBarcos = async (req, res) => {
  try {
    const barcos = await Barco.findAll();
    res.json(barcos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener barcos' });
  }
};

exports.crearBarco = async (req, res) => {
  try {
    const { nombre, tipo, pais_origen, fecha_registro } = req.body;
    const nuevoBarco = await Barco.create({
      nombre,
      tipo,
      pais_origen,
      fecha_registro
    });
    res.json(nuevoBarco);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear barco' });
  }
};
