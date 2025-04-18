// models/Habit.js
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  daysCompleted: { type: Number, default: 0 },
  lastMarked: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
