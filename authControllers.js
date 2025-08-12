// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User   = require('../models');   


exports.register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email ya registrado' });

    const user = new User({ email, name, password });
    await user.save();
    

    console.log('req.session:', req.session);
    req.session.userId = user._id;
    res.status(201).json({ message: 'Registro exitoso', userId: user._id });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    req.session.userId = user._id;
    res.json({ message: 'Login exitoso' });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout exitoso' });
  });
};


// GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.json(users);
  } catch (err) {
    console.error('getAllUsers error:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json(user);
  } catch (err) {
    console.error('getUserById error:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const update = {};

    if (username) update.username = username;
    if (password) {
      update.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.json({ message: 'Usuario actualizado', user });
  } catch (err) {
    console.error('updateUser error:', err);
    return res.status(400).json({ error: 'Datos inválidos' });
  }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    console.error('deleteUser error:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
