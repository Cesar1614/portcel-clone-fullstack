const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
require('dotenv').config();

// ✅ Aquí se define 'app'
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/barcos', require('./routes/barcos'));

app.use('/api/procesos', require('./routes/procesos'));

app.use('/api/pagos', require('./routes/pagos'));



// Conexión con la base de datos
sequelize.sync()
  .then(() => console.log('Base de datos conectada correctamente.'))
  .catch(err => console.error('Error al conectar DB:', err));

// Servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
