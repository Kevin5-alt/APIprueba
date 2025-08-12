// config.js

// 1. Carga variables de .env en process.env
require('dotenv').config();

// 2. Exporta configuración centralizada
module.exports = {
  port: process.env.PORT || 3005,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/loginBD'
};




