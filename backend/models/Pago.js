const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ProcesoAduanero = require('./ProcesoAduanero');

const Pago = sequelize.define('Pago', {
  proceso_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente'
  },
  fecha_pago: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'pagos',
  timestamps: false,
});

Pago.belongsTo(ProcesoAduanero, { foreignKey: 'proceso_id' });

module.exports = Pago;
