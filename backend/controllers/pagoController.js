const Pago = require('../models/Pago');
const Proceso = require('../models/ProcesoAduanero');
const Stripe = require('stripe');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.crearPago = async (req, res) => {
  try {
    const { proceso_id } = req.body;

    const proceso = await Proceso.findByPk(proceso_id);
    if (!proceso) {
      return res.status(404).json({ error: 'Proceso no encontrado' });
    }

    const montoCIF = parseFloat(proceso.valor_cif) * 100; // Stripe usa centavos

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(montoCIF),
      currency: 'usd',
      description: `Pago CIF del barco ${proceso.barco_id}`,
    });

    // Guardar pago en base de datos (marcado como pendiente)
    await Pago.create({
      proceso_id,
      monto: proceso.valor_cif,
      estado: 'pendiente'
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
};
