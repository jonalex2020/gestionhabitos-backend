const Habit = require('../models/Habit');

exports.getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.userId });
  res.json(habits);
};

exports.createHabit = async (req, res) => {
  const habit = await Habit.create({ ...req.body, user: req.userId });
  res.status(201).json(habit);
};

// Implementa funciones similares para actualizar y eliminar hábitos