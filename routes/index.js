var express = require('express');
var router = express.Router();
const Habit = require('../modelo/habit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  res.json({"status": "success", "message": "Hello World!"});
});

// POST /habits
router.post('/habits', async function(req, res, next) {
  try {
    const { id, name, description, frequency, duration, priority, completed } = req.body;
    const existingHabit = await Habit.findOne({ id });
    if (existingHabit) {
      return res.status(400).json({ success: false, message: "El ID ya está en uso. Prueba con otro." });
    }
    const habit = new Habit({ id, name, description, frequency, duration, priority, completed });
    await habit.save(); 
    res.json({ success: true, message: "Hábito creado con éxito", habit });
  } catch (error) {
    console.error("Error al guardar el hábito ->", error);
    res.status(500).json({ success: false, message: "Error al guardar el hábito", error });
  }
});

// GET /habits
router.get('/habits', async function(req, res, next) {
  try {
    const habits = await Habit.find();
    if (habits.length === 0) {
      return res.status(404).json({ success: false, message: "No hay hábitos registrados" });
    }
    res.json({ success: true, habits });
  } catch (error) {
    console.error("Error obteniendo los hábitos ->", error);
    res.status(500).json({ success: false, message: "Error obteniendo los hábitos", error });
  }
});

// GET /habits/:id
router.put('/habits/:id', async function(req, res, next) {
  try {
    let { id } = req.params;
    const updateData = req.body;
    id = id.trim();
    if (!id) {
      return res.status(400).json({ success: false, message: "Se requiere un ID para actualizar el hábito" });
    }
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: "No hay datos para actualizar" });
    }
    const habit = await Habit.findOneAndUpdate({ id: id }, updateData, { new: true, runValidators: true });
    if (!habit) {
      return res.status(404).json({ success: false, message: `Hábito con id '${id}' no encontrado` });
    }
    res.json({ success: true, message: "Hábito actualizado correctamente", habit });
  } catch (error) {
    console.error("Error actualizando el hábito ->", error);
    res.status(500).json({ success: false, message: "Error actualizando el hábito", error });
  }
});

// DELETE /habits/:id
router.delete('/habits/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Se requiere un ID para eliminar el hábito" });
    }
    const habit = await Habit.findOneAndDelete({ id: id });
    if (!habit) {
      return res.status(404).json({ success: false, message: "Hábito no encontrado" });
    }
    res.json({ success: true, message: "Hábito eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando el hábito ->", error);
    res.status(500).json({ success: false, message: "Error eliminando el hábito", error });
  }
});





module.exports = router;