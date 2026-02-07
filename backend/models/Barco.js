// models/Barco.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Barco = sequelize.define('Barco', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
  },
  pais_origen: {
    type: DataTypes.STRING,
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'barcos',
  timestamps: false,
});

module.exports = Barco;
