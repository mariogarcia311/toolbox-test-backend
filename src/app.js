import express from 'express';
import cors from 'cors';
import { environment } from './config/environment.js';
import filesRoutes from './routes/filesRouter.js';

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
