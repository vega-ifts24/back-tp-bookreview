import { connection } from "../database/index.js";

export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM users")
        if (!rows.length) throw ("Ocurrió un error al obtener los usuarios.")
        res.status(200).send({ error: false, body: rows, message: "Datos del usuario obtenidos con éxito" })
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ error: true, body: null, message: error.message || error });
    }

}

export const getUserByToken = async (req, res) => {
    try {
        const id = req.userId
        if (!id) throw ("No se obtuvo un userId")
        const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", id)
        if (!rows.length) throw ("Ocurrió un error al obtener el usuario, id inexistente.")
        res.status(200).send({ error: false, body: rows, message: "Datos del usuario obtenidos con éxito" })
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ error: true, body: null, message: error.message || error });
    }

}

export const updateUser = async (req, res) => {
    try {
        const id = req.userId
        if (!id) throw ("No se obtuvo un userId")
        const { first_name, surname, birth_date } = req.body
        const [result] = await connection.query(
            'UPDATE users SET first_name = ?,  surname = ?,  birth_date = ? WHERE id = ?',
            [first_name, surname, birth_date, id]
        )

        if (result.affectedRows === 0) {
            throw ({ status: 404, message: 'Usuario no encontrado.' });
        } else {
            res.status(200).send({ error: false, body: null, message: 'Usuario actualizado exitosamente' })
        }

    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ error: true, body: null, message: error.message || error });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.userId
        if (!id) throw ("No se obtuvo un userId")
        const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw ({ status: 404, message: 'Usuario no encontrado.' });
        } else {
            res.status(200).send({ error: false, body: null, message: 'Usuario eliminado exitosamente'})

        }
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ error: true, body: null, message: error.message || error });
    }

}