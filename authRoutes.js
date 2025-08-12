// auth.js

const express = require('express');
const router  = express.Router();
const registerApi  = require('./api/register');  // apunta a register.js
const loginApi     = require('./api/login');     // apunta a login.js
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('./controllers/authControllers');



// Registro e inicio de sesión
router.post('/register', registerApi);
router.post('/login', loginApi);

// Consultas (Read)
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

// Actualización (Update)
router.put('/users/:id', updateUser);

// Eliminación (Delete)
router.delete('/users/:id', deleteUser);

module.exports = router;
