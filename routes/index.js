require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const habitRoutes = require('./routes/habit');

const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('API Gestión de Hábitos funcionando');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err.message);
  });

  const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);