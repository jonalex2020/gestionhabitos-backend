require('dotenv').config(); // <- SIEMPRE arriba

const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");

// Base de datos
require("./config/database.js");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// Configuración CORS correcta (única)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Ruta de prueba
app.get("/habits", (req, res) => {
  res.json({ message: "CORS habilitado correctamente", habits: [] });
});

// Manejo de errores
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

