import chalk from "chalk";
import { connection } from "../database/index.js"; // Importar la conexión a la base de datos.

// Obtener todos los géneros
export const getAllGenders = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM genders");
    res.status(200).send({
      error: false,
      body: rows,
      message: "Géneros obtenidos con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al obtener géneros: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Obtener un género por ID
export const getGenderById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM genders WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw { status: 404, message: "Género no encontrado." };
    } else {
      res.status(200).send({
        error: false,
        body: rows,
        message: "Género obtenido con exito",
      });
    }
  } catch (error) {
    console.error(chalk.red("❌ Error al obtener género por ID: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Crear un nuevo género
export const createGender = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    const result = await connection.query(
      "INSERT INTO genders (name) VALUES (?)",
      [name]
    );
    res.status(200).send({
      error: false,
      body: null,
      message: "Género creado con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al crear género: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Actualizar un género existente
export const updateGender = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const [result] = await connection.query(
      "UPDATE genders SET name = ? WHERE id = ?",
      [name, id]
    );
    res.status(200).send({
      error: false,
      body: null,
      message: "Género actualizado con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al actualizar género: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Eliminar un género existente
export const deleteGender = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query(
      "DELETE FROM genders WHERE id = ?",
      [id]
    );
    res.status(200).send({
      error: false,
      body: null,
      message: "Género eliminado con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al eliminar género: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
