const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  const token = createToken(user._id);
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });
  res.status(201).json({ message: 'Usuario registrado' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const token = createToken(user._id);
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });
  res.json({ message: 'Login exitoso' });
};
