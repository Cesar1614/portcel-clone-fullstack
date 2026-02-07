// routes/barcos.js
const express = require('express');
const router = express.Router();
const barcoController = require('../controllers/barcoController');

// GET /api/barcos
router.get('/', barcoController.obtenerBarcos);

// POST /api/barcos
router.post('/', barcoController.crearBarco);

module.exports = router;
