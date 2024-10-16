// back/server.js
import express from 'express';
import rootRouter from './routes/index.js'; // Importar el enrutador raíz.

const app = express();
const port = 3000;

app.use(express.json()); // Para analizar solicitudes JSON.
const router = express.Router();


// Usar el enrutador raíz para todas las rutas de la API.
app.use('/api', rootRouter);
router.get("/", async (_, res) => {
  res.send('📚 Bookreview Back-end');
})
app.listen(port, () => {
  console.log(`✅ Server running on port http://localhost:${port}/`);
});

export default router;

