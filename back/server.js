// back/server.js
import express from "express";
import rootRouter from "./routes/index.js"; // Importar el enrutador raíz.
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Para analizar solicitudes JSON.
app.use(cors()); // Para permitir solicitudes de origen cruzado.

const router = express.Router();

// Middleware para registrar cada solicitud entrante
app.use((req, _, next) => {
  console.log(chalk.cyanBright(`\n${req.method} ${req.url}`));
  next();
});

// Usar el enrutador raíz para todas las rutas de la API.
app.use("/api", rootRouter);
app.get("/", async (_, res) => {
  res.send(`
    <html>
      <head>
        <title>📚 Bookreview Back-end</title>
        <style>
          *{
          margin:0;
          }
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
            text-align: left;
          }
          ul {
            width: fit-content;
          }
          li {
            text-align: start;

          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>📚 Bookreview Back-end</h1>
          <h2>Bienvenido a la API de la web <a href="https://bookreview-ifts24.vercel.app/" target="_blank">https://bookreview-ifts24.vercel.app/</a></h2>
          <h3>Visualiza las rutas:</h3>
          </br>
          <ul>
            <li>
              <h3><a href="/api/books">Books</a> - Obtén información de libros.</h3>
              <br/><h4>Métodos disponibles:</h4>
              <ul>
                <li>GET: Obtiene todos los libros o uno por ID.</li>
                <li>POST: Crea un nuevo libro.</li>
                <li>PUT: Actualiza un libro por ID.</li>
                <li>DELETE: Elimina un libro por ID.</li>
              </ul>
              <br/><h4>Contenido adicional:</h4>
              <ul>
                <li>Headers: Autenticación (opcional, según el endpoint).</li>
                <li>Body para POST/PUT: { title, coverLink, author, gender }.</li>
              </ul>
            </li>
            <br/>
            <br/>
            <li>
              <h3><a href="/api/reviews">Reviews</a> - Gestiona reseñas de libros.</h3>
              <br/><h4>Métodos disponibles:</h4>
              <ul>
                <li>GET: Obtiene todas las reseñas o una por ID.</li>
                <li>POST: Crea una nueva reseña.</li>
                <li>PUT: Actualiza una reseña por ID.</li>
                <li>DELETE: Elimina o archiva una reseña por ID.</li>
              </ul>
              <br/><h4>Contenido adicional:</h4>
              <ul>
                <li>Headers: Autenticación requerida para crear, actualizar y eliminar reseñas.</li>
                <li>Body para POST/PUT: { bookId, userId, comment, rating, startDate, endDate }.</li>
              </ul>
            </li>
            <br/>
            <br/>
            <li>
              <h3><a href="/api/users">Users</a> - Administración de usuarios.</h3>
              <br/><h4>Métodos disponibles:</h4>
              <ul>
                <li>GET: Obtiene todos los usuarios o detalles del usuario autenticado.</li>
                <li>PUT: Actualiza detalles del usuario.</li>
                <li>DELETE: Elimina el usuario autenticado.</li>
              </ul>
              <br/><h4>Contenido adicional:</h4>
              <ul>
                <li>Headers: Autenticación requerida para todos los endpoints.</li>
                <li>Body para PUT: { first_name, surname, email, password, birth_date } (según el campo a actualizar).</li>
              </ul>
            </li>
            <br/>
            <br/>
            <li>
              <h3><a href="/api/auth/register">Auth</a> - Registro e inicio de sesión.</h3>
              <br/><h4>Métodos disponibles:</h4>
              <ul>
                <li>POST /register: Registra un nuevo usuario.</li>
                <li>POST /login: Inicia sesión.</li>
              </ul>
              <br/><h4>Contenido adicional:</h4>
              <ul>
                <li>Headers: No se requiere autenticación.</li>
                <li>Body para /register: { first_name, surname, email, password, birth_date }.</li>
                <li>Body para /login: { email, password }.</li>
              </ul>
            </li>
          </ul>

          </br>
          </br>
          <h3>Colección de postman:</h3>
          <p>Utiliza la colección de postman para interactuar con la api</p>
          <a href="https://www.postman.com/nativegaifts24/ifts24-back/collection/kpgsybx/books-review-api">Book-Review-api collection</a>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(
    chalk.green.inverse.bold(
      " -------------------------------------------- \n" +
        `  Servidor iniciado en http://localhost:${port}  ` +
        "\n -------------------------------------------- "
    )
  );
});

export default router;
