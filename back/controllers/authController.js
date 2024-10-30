import { connection } from "../database/index.js"; // Importar la conexión a la base de datos.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { first_name, surname, email, password, birth_date } = req.body;

    // Campos obligatorios
    if (!first_name || !surname || !email || !password || !birth_date) {
      throw "Debe completar todos los campos para registrarse.";
    }

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
      "INSERT INTO users (first_name, surname, email, password, birth_date) VALUES (?, ?, ?, ?, ?)",
      [first_name, surname, email, hashPassword, birth_date]
    );

    res.status(201).send({
      error: false,
      body: [{ id: result[0].insertId }],
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
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
    const token = jwt.sign({ id: rows[0].id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).send({
      error: false,
      body: [{ token }],
      message: "Inicio de sesión exitoso.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
