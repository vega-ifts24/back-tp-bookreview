import { connection } from "../database/index.js"; // Importar la conexión a la base de datos.

// Obtener todas las review
export const getAllReviews = async (_, res) => {
  try {
    const [rows] = await connection.query("SELECT * from reviews");
    res.status(200).send({
      error: false,
      body: rows,
      message: "Reseñas obtenidas con éxito.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Obtener review por id
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await connection.query(
      "SELECT * FROM reviews WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw { status: 404, message: "Reseña no encontrada." };
    } else {
      res.status(200).send({
        error: false,
        body: rows,
        message: "Reseñas obtenida con éxito.",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

export const getReviewsByToken = async (req, res) => {
  try {
    const id = req.userId;
    console.log(id);
    const [rows] = await connection.query(
      "SELECT * FROM reviews WHERE userId = ?",
      [id]
    );

    res.status(200).send({
      error: false,
      body: rows,
      message: rows.length
        ? "Reseñas obtenidas con éxito."
        : "Aún no hay reseñas.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Crear nueva review
export const createReview = async (req, res) => {
  try {
    const { bookId, userId, description, rating, startDate, endDate } =
      req.body;
    const result = await connection.query(
      "INSERT INTO reviews (bookId, userId, description, rating, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)",
      [bookId, userId, description, rating, startDate, endDate]
    );
    res.status(201).send({
      error: false,
      body: [
        {
          id: result[0].insertId,
        },
      ],
      message: "Reseña creada exitosamente",
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Eliminar review
export const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await connection.query(
      "DELETE FROM reviews WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw { status: 404, message: "Reseña no encontrada." };
    } else {
      res.status(200).send({
        error: false,
        body: null,
        message: "Reseña eliminada exitosamente",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
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
      throw { status: 404, message: "Reseña no encontrada." };
    }

    // Obtener el nuevo estado de 'archived' después de la actualización
    const [updatedReview] = await connection.query(
      "SELECT archived FROM reviews WHERE id = ?",
      [id]
    );

    const newStatus = updatedReview[0].archived ? "archivada" : "desarchivada";

    // Devolver el mensaje con el nuevo estado
    res.status(200).send({
      error: false,
      body: null,
      message: `La reseña ha sido ${newStatus} exitosamente.`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Editar review
export const updateReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, rating, startDate, endDate } = req.body;
    const [result] = await connection.query(
      "UPDATE reviews SET description = ?, rating = ?, startDate = ?, endDate = ? WHERE id = ?",
      [description, rating, startDate, endDate, id]
    );

    if (result.affectedRows === 0) {
      throw { status: 404, message: "Reseña no encontrada." };
    } else {
      res.status(200).send({
        error: false,
        body: null,
        message: "Reseña actualizada exitosamente",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
