// ✅ BACKEND - routes/pagos.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Proceso = require('../models/ProcesoAduanero');
const Barco = require('../models/Barco');
const Pago = require('../models/Pago');

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { proceso_id } = req.body;

    const proceso = await Proceso.findByPk(proceso_id, {
      include: Barco
    });

    if (!proceso) {
      return res.status(404).json({ error: 'Proceso no encontrado' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Pago CIF barco ${proceso.Barco?.nombre || 'Desconocido'}`,
              description: proceso.descripcion
            },
            unit_amount: Math.round(parseFloat(proceso.valor_cif) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/pago-exitoso?proceso_id=${proceso.id}`,
      cancel_url: 'http://localhost:5173/pago-cancelado',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error al crear sesión de Stripe:', error);
    res.status(500).json({ error: 'Error al crear la sesión de pago' });
  }
});

// ✅ NUEVA RUTA - Marcar pago como aprobado
router.post('/confirmar-pago', async (req, res) => {
  try {
    const { proceso_id } = req.body;

    const pago = await Pago.findOne({ where: { proceso_id } });

    if (pago) {
      pago.estado = 'aprobado';
      await pago.save();
    } else {
      await Pago.create({ proceso_id, monto: 0, estado: 'aprobado' });
    }

    res.json({ mensaje: 'Pago confirmado' });
  } catch (error) {
    console.error('Error al confirmar pago:', error);
    res.status(500).json({ error: 'Error al confirmar pago' });
  }
});

module.exports = router;