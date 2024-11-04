import chalk from "chalk";
import { connection } from "../database/index.js"; // Importar la conexión a la base de datos.

// Obtener todas las review
export const getAllReviews = async (_, res) => {
  try {
    // Obtener todas las reseñas con la imageLink name y surname del usuario
    const [rows] = await connection.query(
      "SELECT reviews.*, users.first_name, users.surname, users.imageLink FROM reviews JOIN users ON reviews.userId = users.id"
    );
    res.status(200).send({
      error: false,
      body: rows,
      message: "Reseñas obtenidas con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al obtener reseñas: "), error);
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
    console.error(chalk.red("❌ Error al obtener reseña por ID: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Obtener reviews por libro
export const getReviewsByBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const [rows] = await connection.query(
      "SELECT reviews.*, users.first_name, users.surname, users.imageLink FROM reviews JOIN users ON reviews.userId = users.id WHERE bookId = ?",
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
    console.error(chalk.red("❌ Error al obtener reseñas por libro: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

export const getReviewsByToken = async (req, res) => {
  try {
    const id = req.userId;

    // Consigo la review con el libro segun la columna bookId de la tabla reviews
    const [rows] = await connection.query(
      "SELECT reviews.*, books.id as bookId, books.title, books.author, books.imageLink FROM reviews JOIN books ON reviews.bookId = books.id WHERE reviews.userId = ?",
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
    console.error(chalk.red("❌ Error al obtener reseñas por token: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Crear nueva review
export const createReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId, comment, rating, startDate, endDate } = req.body;

    // Validar si ya existe una reseña para el mismo libro y usuario
    const [existingReview] = await connection.query(
      "SELECT * FROM reviews WHERE bookId = ? AND userId = ?",
      [bookId, userId]
    );

    if (existingReview.length > 0) {
      throw { status: 400, message: "Ya tienes una reseña de este libro." };
    }

    const result = await connection.query(
      "INSERT INTO reviews (bookId, userId, comment, rating, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)",
      [bookId, userId, comment, rating, startDate, endDate]
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
    console.error(chalk.red("❌ Error al crear reseña: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Eliminar review
export const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
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
    console.error(chalk.red("❌ Error al eliminar reseña por ID: "), error);
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
    console.error(chalk.red("❌ Error al archivar reseña por ID: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Editar review
export const updateReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rating, startDate, endDate } = req.body;
    const [result] = await connection.query(
      "UPDATE reviews SET comment = ?, rating = ?, startDate = ?, endDate = ? WHERE id = ?",
      [comment, rating, startDate, endDate, id]
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
    console.error(chalk.red("❌ Error al actualizar reseña por ID: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
