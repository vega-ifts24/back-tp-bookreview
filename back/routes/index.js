// back/routes/index.js
import express from 'express';
import booksRouter from './books/index.js'; // Importar rutas de libros

const router = express.Router();

router.use('/books', booksRouter); // Usar las rutas de libros para el prefijo /books

export default router;
