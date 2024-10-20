// back/server.js
import express from 'express';
import rootRouter from './routes/index.js'; // Importar el enrutador raíz.
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Para analizar solicitudes JSON.
const router = express.Router();


// Usar el enrutador raíz para todas las rutas de la API.
app.use('/api', rootRouter);

app.get("/", async (_, res) => {
  res.send(`
    <html>
      <head>
        <title>📚 Bookreview Back-end</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            text-align: center;
            margin-top: 50px;
          }
          h1 {
            color: #990000;
          }
          a {
            color: #0066cc;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>📚 Bookreview Back-end</h1>
          <p>Welcome to the back-end of the Bookreview application! This is the API for managing book reviews.</p>
          <p>Check out the following links:</p>
          <ul>
            <li><a href="/api/books">View all books</a></li>
            <li><a href="/api/reviews">View all reviews</a></li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}/`);
});

export default router;

