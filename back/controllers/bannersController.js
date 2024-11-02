import chalk from "chalk";
import { connection } from "../database/index.js"; // Importar la conexión a la base de datos.

// Obtener todos los Banners
export const getAllBanners = async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM `book-review`.banners"
    );
    res.status(200).send({
      error: false,
      body: rows,
      message: "Banners obtenidos con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al obtener Banners: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Obtener un Banner por ID
export const getBannerById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM `book-review`.banners WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw { status: 404, message: "Banner no encontrado." };
    } else {
      res.status(200).send({
        error: false,
        body: rows,
        message: "Banner obtenido con exito",
      });
    }
  } catch (error) {
    console.error(chalk.red("❌ Error al obtener Banner por ID: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Crear un nuevo Banner
export const createBanner = async (req, res) => {
  const { title, imageLink, section } = req.body;

  try {
    const result = await connection.query(
      "INSERT INTO `book-review`.banners (title, imageLink, `section`) VALUES (?, ?, ?)",
      [title, imageLink, section]
    );
    res.status(200).send({
      error: false,
      body: null,
      message: "Banner creado con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al crear Banner: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Actualizar un Banner existente
export const updateBanner = async (req, res) => {
  const { title, imageLink, section } = req.body;
  const { id } = req.params;
  try {
    const [result] = await connection.query(
      "UPDATE `book-review`.banners SET title = ?, imageLink = ?, `section` = ? WHERE id = ?",
      [title, imageLink, section, id]
    );

    res.status(200).send({
      error: false,
      body: null,
      message: "Banner actualizado con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al actualizar Banner: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Eliminar un Banner existente
export const deleteBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query(
      "DELETE FROM `book-review`.banners WHERE id = ?",
      [id]
    );
    res.status(200).send({
      error: false,
      body: null,
      message: "Banner eliminado con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al eliminar Banner: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
