require('dotenv').config();
const app = require('./index'); // o './app' si tu archivo principal se llama app.js

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
