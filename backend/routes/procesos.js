const express = require('express');
const router = express.Router();
const procesoController = require('../controllers/procesoController');

router.post('/', procesoController.crearProceso);
router.get('/', procesoController.listarProcesosConBarcos);

module.exports = router;
