import chalk from "chalk";
import { connection } from "../database/index.js"; // Importar la conexión a la base de datos.

// Obtener todos los Roles
export const getAllRoles = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM roles");
    res.status(200).send({
      error: false,
      body: rows,
      message: "Roles obtenidos con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al obtener roles: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Obtener un Rol por ID
export const getRolById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query("SELECT * FROM roles WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      throw { status: 404, message: "Rol no encontrado." };
    } else {
      res.status(200).send({
        error: false,
        body: rows,
        message: "Rol obtenido con exito",
      });
    }
  } catch (error) {
    console.error(chalk.red("❌ Error al obtener Rol por ID: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Crear un nuevo Rol
export const createRol = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await connection.query(
      "INSERT INTO roles (name, description)  VALUES (?,?)",
      [name, description]
    );
    res.status(200).send({
      error: false,
      body: null,
      message: "Rol creado con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al crear Rol: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Actualizar un Rol existente
export const updateRol = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    const [result] = await connection.query(
      "UPDATE roles SET name = ?, description = ? WHERE id = ?",
      [name, description, id]
    );
    res.status(200).send({
      error: false,
      body: null,
      message: "Rol actualizado con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al actualizar Rol: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Eliminar un Rol existente
export const deleteRol = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query("DELETE FROM roles WHERE id = ?", [
      id,
    ]);
    res.status(200).send({
      error: false,
      body: null,
      message: "Rol eliminado con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al eliminar Rol: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
