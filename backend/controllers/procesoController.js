const Proceso = require('../models/ProcesoAduanero');
const Barco = require('../models/Barco');

exports.crearProceso = async (req, res) => {
  try {
    const { barco_id, descripcion, valor_producto, costo_seguro, costo_flete } = req.body;
    const valor_cif = parseFloat(valor_producto) + parseFloat(costo_seguro) + parseFloat(costo_flete);

    const nuevoProceso = await Proceso.create({
      barco_id,
      descripcion,
      valor_producto,
      costo_seguro,
      costo_flete,
      valor_cif
    });

    res.json(nuevoProceso);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proceso aduanero' });
  }
};

exports.listarProcesosConBarcos = async (req, res) => {
  try {
    const procesos = await Proceso.findAll({
      include: {
        model: Barco,
        attributes: ['nombre', 'tipo', 'pais_origen']
      }
    });
    res.json(procesos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los procesos aduaneros' });
  }
};
