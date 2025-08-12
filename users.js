const express = require('express');
const router = express.Router();
const User = require('../models'); // Ajusta si tu modelo está en models/User.js
const isAuth = require('./middleware'); // Middleware que verifica req.session.userId

// GET /users/me
router.get('/me', isAuth, async (req, res) => {
  const user = await User.findById(req.session.userId).select('-password');
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
});

// PUT /users/:id
router.put('/:id', isAuth, async (req, res) => {
  const update = {};
  if (req.body.name) update.name = req.body.name;
  if (req.body.password) {
    const bcrypt = require('bcrypt');
    update.password = await bcrypt.hash(req.body.password, 10);
  }

  const user = await User.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
});

// DELETE /users/:id
router.delete('/:id', isAuth, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.status(204).end();
});

module.exports = router;
