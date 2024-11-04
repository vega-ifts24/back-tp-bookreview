// back/routes/books/index.js
import express from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../../controllers/bookController.js"; // Importar funciones del controlador.
import { authMiddleWare } from "../../middleware/authMiddleware.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

// Definir las rutas de libros, asociándolas a sus respectivos controladores.

router.get("/", getAllBooks); // Obtener todos los libros.

router.get("/:id", getBookById); // Obtener un libro por ID.

router.post("/", authMiddleWare, upload.single("imageLink"), createBook); // Crear un nuevo libro.

router.put("/:id", authMiddleWare, upload.single("imageLink"), updateBook); // Actualizar un libro existente.

router.delete("/:id", authMiddleWare, deleteBook); // Eliminar un libro.

export default router;
