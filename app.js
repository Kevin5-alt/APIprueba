// app.js

require('dotenv').config();
const express        = require('express');
const mongoose       = require('mongoose');
const initSession   = require('./session');
const authRoutes = require('./authRoutes');
const userRoutes = require('./api/users'); 




const app = express();
const PORT = process.env.PORT || 3005;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB (ajusta URI según tu entorno)
mongoose.connect('mongodb://localhost:27017/loginBD', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conexión a MongoDB exitosa'))
.catch(err => console.error('❌ Error al conectar a MongoDB', err));

initSession(app);

// En app.js, en lugar de app.use('/auth', …), usa:
app.use('/register', require('./api/register'));
app.use('/login',    require('./api/login'));
app.use('/users', require('./api/users'));



// Middleware catch-all para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: 'Recurso no encontrado' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
