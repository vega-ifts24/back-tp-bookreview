import { connection } from "../database/index.js"; // Importar la conexión a la base de datos.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import chalk from "chalk";

export const register = async (req, res) => {
  try {
    const { first_name, surname, email, password, birth_date } = req.body;
    const imageLink = req.file ? `/uploads/${req.file.filename}` : null; // Ruta de la imagen
    // Campos obligatorios
    if (!first_name || !surname || !email || !password || !birth_date) {
      throw "Debe completar todos los campos para registrarse.";
    }

    console.log(first_name, surname, email, password, birth_date, imageLink);

    // Chequeo que el mail no esté en uso
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // Si hay un resultado, ya existe
    if (rows.length !== 0) {
      throw "El correo electrónico ya se encuentra en uso.";
    }

    // Encripto la constraseña
    const hashPassword = bcrypt.hashSync(password, 8);

    const result = await connection.query(
      "INSERT INTO users (first_name, surname, email, password, birth_date,imageLink) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, surname, email, hashPassword, birth_date, imageLink]
    );
    res.status(201).send({
      error: false,
      body: [{ id: result[0].insertId }],
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al registrar usuario: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw "Debe completar todos los campos.";
    }

    // Chequeo que el usuario exista
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // Si no hay resultados
    if (!rows.length) {
      throw "El correo o la constraseña son incorrectos.";
    }
    const passwordIsValid = bcrypt.compareSync(password, rows[0].password);

    if (!passwordIsValid) {
      throw "El correo o la constraseña son incorrectos.";
    }
    const token = jwt.sign({ id: rows[0].id }, process.env.SECRET_KEY, {});

    res.status(200).send({
      error: false,
      body: [{ token }],
      message: "Inicio de sesión exitoso.",
    });
  } catch (error) {
    console.error(chalk.red("❌ Error al iniciar sesión: "), error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
