import chalk from "chalk";
import { connection } from "../database/index.js"; // Importar la conexión a la base de datos.

// Obtener todos los libros
export const getAllBooks = async (req, res) => {
  try {
    // Si tengo parametros de busqueda los uso
    //
    //
    const search = req.query.search; // esto seria /books?search=algo, puede ser author, title

    if (search) {
      const [rows] = await connection.query(
        `SELECT books.*, genders.name AS gender_name 
         FROM books 
         LEFT JOIN genders ON books.genderId = genders.id 
         WHERE LOWER(books.title) LIKE LOWER(?) 
         OR LOWER(books.author) LIKE LOWER(?) 
         OR LOWER(genders.name) LIKE LOWER(?)`,
        [`%${search}%`, `%${search}%`, `%${search}%`]
      );
      return res.status(200).send({
        error: false,
        body: rows,
        message: "Libros obtenidos con éxito.",
      });
    }

    // Si no tengo parametros de busqueda, traigo todos los libros
    const [rows] = await connection.query(
      "SELECT books.*, genders.name AS gender_name  FROM `book-review`.books  LEFT JOIN `book-review`.genders ON books.genderId = genders.id"
    );

    res.status(200).send({
      error: false,
      body: rows,
      message: "Libros obtenidos con éxito.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al obtener libros: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Obtener un libro por ID
export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query("SELECT * FROM books WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      throw { status: 404, message: "Libro no encontrado." };
    } else {
      res.status(200).send({
        error: false,
        body: rows,
        message: "Libro obtenido con exito",
      });
    }
  } catch (error) {
    console.error(chalk.red("❌ Error al obtener libro por ID: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Crear un nuevo libro
export const createBook = async (req, res) => {
  const { title, author, genderId } = req.body;
  const imageLink = req.file ? `/uploads/${req.file.filename}` : null; // Ruta de la imagen
  try {
    const result = await connection.query(
      "INSERT INTO books (title, imageLink, author, genderId) VALUES (?, ?, ?, ?)",
      [title, imageLink, author, genderId]
    );
    res.status(201).send({
      error: false,
      body: result[0].insertId,
      message: "Libro creado con éxito.",
    });
  } catch (error) {
    console.error("Error al crear libro: ", error);
    res.status(500).send({ error: true, message: "Error al crear libro" });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genderId } = req.body;
  const imageLink = req.file ? `/uploads/${req.file.filename}` : null; // Ruta de la imagen

  console.log(title, author, genderId, imageLink, req.file);

  try {
    const [result] = await connection.query(
      "UPDATE books SET title = ?, imageLink = ?, author = ?, genderId = ? WHERE id = ?",
      [title, imageLink, author, genderId, id]
    );

    if (result.affectedRows === 0) {
      throw { status: 404, message: "Libro no encontrado." };
    } else {
      res.status(200).send({
        error: false,
        body: result, // Cambiado de 'rows' a 'result'
        message: "Libro actualizado exitosamente",
      });
    }
  } catch (error) {
    console.error("❌ Error al actualizar libro: ", error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

// Eliminar un libro
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const [result] = await connection.query("DELETE FROM books WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      throw { status: 404, message: "Libro no encontrado." };
    } else {
      res.status(200).send({
        error: false,
        body: rows,
        message: "Libro eliminado exitosamente",
      });
    }
  } catch (error) {
    console.error(chalk.red("❌ Error al eliminar libro: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
