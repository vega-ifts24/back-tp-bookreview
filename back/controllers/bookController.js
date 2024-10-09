// back/controllers/booksController.js
import { connection } from '../database/index.js'; // Importar la conexión a la base de datos.

// Obtener todos los libros
export const getAllBooks = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM books');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los libros.');
    }
};

// Obtener un libro por ID
export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await connection.query('SELECT * FROM books WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).send('Libro no encontrado.');
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el libro.');
    }
};

// Crear un nuevo libro
export const createBook = async (req, res) => {
    const { title, coverLink, author, gender } = req.body;
    try {
        const result = await connection.query(
            'INSERT INTO books (title, coverLink, author, gender) VALUES (?, ?, ?, ?)',
            [title, coverLink, author, gender]
        );
        res.status(201).json({ message: 'Libro creado exitosamente', id: result[0].insertId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el libro.');
    }
};

// Actualizar un libro existente
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, coverLink, author, gender } = req.body;
    try {
        const [result] = await connection.query(
            'UPDATE books SET title = ?, coverLink = ?, author = ?, gender = ? WHERE id = ?',
            [title, coverLink, author, gender, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).send('Libro no encontrado.');
        } else {
            res.json({ message: 'Libro actualizado exitosamente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el libro.');
    }
};

// Eliminar un libro
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await connection.query('DELETE FROM books WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).send('Libro no encontrado.');
        } else {
            res.json({ message: 'Libro eliminado exitosamente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el libro.');
    }
};
