const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const auth = require('../middleware/auth');

router.get('/', auth, habitController.getHabits);
router.post('/', auth, habitController.createHabit);
// Agrega rutas para actualizar y eliminar hábitos

module.exports = router;
