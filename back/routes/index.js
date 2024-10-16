// back/routes/index.js
import express from 'express';
import booksRouter from './books/index.js'; // Importar rutas de libros
import reviewsRouter from './reviews/index.js'
const router = express.Router();

router.get("/", async (_, res) => {
    res.send('📚 Api Bookreview');
})
router.use('/books', booksRouter); // Usar las rutas de libros para el prefijo /books
router.use('/reviews', reviewsRouter)

export default router;
