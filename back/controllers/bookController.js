import { connection } from '../database/index.js'; // Importar la conexión a la base de datos.

// Obtener todos los libros
export const getAllBooks = async (_, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM books');
        res.status(200).send({ error: false, body: rows, message: "Libros obtenidos con éxito." })

    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ error: true, body: null, message: error.message || error });
    }
};

// Obtener un libro por ID
export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await connection.query('SELECT * FROM books WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw ({ status: 404, message: 'Libro no encontrado.'});

        } else {
            res.status(200).send({ error: false, body: rows, message: "Libro obtenido con exito" })
        }
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ error: true, body: null, message: error.message || error });
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
        res.status(error.status || 500).send({ error: true, body: null, message: error.message || error });
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
            throw ({ status: 404, message: 'Libro no encontrado.'});

        } else {
            res.status(200).send({ error: false, body: rows, message: 'Libro actualizado exitosamente' })
        }
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ error: true, body: null, message: error.message || error });
    }
};

// Eliminar un libro
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await connection.query('DELETE FROM books WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw ({ status: 404, message: 'Libro no encontrado.'});
        } else {
            res.status(200).send({ error: false, body: rows, message:  'Libro eliminado exitosamente' })
        }
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ error: true, body: null, message: error.message || error });
    }
};
