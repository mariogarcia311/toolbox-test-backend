const express = require('express');
const cors = require('cors');
const { environment } = require('./config/environment.js');
const filesRoutes = require('./routes/filesRouter.js');

const app = express();
const PORT = environment.port || 3000;

app.use(cors());
// Middleware para parsear JSON
app.use(express.json());
app.use('/files', filesRoutes);

// Rutas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
