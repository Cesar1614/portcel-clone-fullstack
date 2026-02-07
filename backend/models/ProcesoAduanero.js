const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Barco = require('./Barco');

const ProcesoAduanero = sequelize.define('ProcesoAduanero', {
  barco_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  valor_producto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  costo_seguro: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  costo_flete: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  valor_cif: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'procesos_aduaneros',
  timestamps: false,
});

// Asociación
ProcesoAduanero.belongsTo(Barco, { foreignKey: 'barco_id' });

module.exports = ProcesoAduanero;
