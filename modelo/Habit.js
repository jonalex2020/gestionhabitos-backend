const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true,
        unique: true 
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});


module.exports = mongoose.model('Habit', habitSchema);
