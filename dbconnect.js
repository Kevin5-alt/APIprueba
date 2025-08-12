// dbconnect.js

const mongoose = require('mongoose');
const { mongoURI } = require('./config');

async function dbconnect() {
  try {
    // Opcional: activa un modo estricto de consultas
    mongoose.set('strictQuery', true);

    // Intentar conectar con la URI
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Conexión a MongoDB exitosa');
  } catch (err) {
    console.error('❌ Error de conexión a MongoDB:', err.message);
    // Si no conecta, detiene la aplicación
    process.exit(1);
  }
}

module.exports = dbconnect;
