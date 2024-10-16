import { connection } from '../database/index.js'; // Importar la conexión a la base de datos.


// Obtener todas las review
export const getAllReviews = async (_, res) => {
    try {
        const [rows] = await connection.query("SELECT * from reviews")
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las reseñas.');
    }
}

// Obtener review por id
export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params
        const [rows] = await connection.query('SELECT * FROM reviews WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).send('Reseña no encontrada.');
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las reseñas.');
    }
}

// Crear nueva review
export const createReview = async (req, res) => {
    try {
        const {bookId, userId, description, rating, startDate, endDate  } = req.body;
        const result = await connection.query(
            'INSERT INTO reviews (bookId, userId, description, rating, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)',
            [bookId, userId, description, rating, startDate, endDate]
        );
        res.status(201).json({ message: 'Reseña creada exitosamente', id: result[0].insertId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear la reseña');
    }
}

// Eliminar review
export const deleteReviewById = async (req, res) => {
    try {
        const {id} = req.params
        const [result] = await connection.query("DELETE FROM reviews WHERE id = ?", [id]  )
        if (result.affectedRows === 0) {
            res.status(404).send('Reseña no encontrada.');
        } else {
            res.json({ message: 'Reseña eliminada exitosamente' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al eliminar la reseña.');
    }
}
// Eliminar review
export const archiveReviewById = async (req, res) => {
    try {
        const { id } = req.params;

        // Alternar el valor de archived y obtener el nuevo estado
        const [result] = await connection.query(
            "UPDATE reviews SET archived = NOT archived WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('Reseña no encontrada.');
        }

        // Obtener el nuevo estado de 'archived' después de la actualización
        const [updatedReview] = await connection.query(
            "SELECT archived FROM reviews WHERE id = ?",
            [id]
        );

        const newStatus = updatedReview[0].archived ? 'archivada' : 'desarchivada';

        // Devolver el mensaje con el nuevo estado
        res.json({ message: `La reseña ha sido ${newStatus} exitosamente.` });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cambiar el estado de archivo de la reseña.');
    }
}

// Editar review
export const updateReviewById = async (req, res) => {
    try {
        const {id} = req.params
        const { description, rating, startDate, endDate} = req.body
        const [result] = await connection.query(
            'UPDATE reviews SET description = ?, rating = ?, startDate = ?, endDate = ? WHERE id = ?',
             [description, rating, startDate, endDate, id]
        )

        if (result.affectedRows === 0) {
            res.status(404).send('Reseña no encontrado.');
        } else {
            res.json({ message: 'Reseña actualizada exitosamente' });
        }
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al actualizar la reseña.');
    }
}