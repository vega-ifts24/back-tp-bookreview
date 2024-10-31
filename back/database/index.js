// back/database/index.js
import mysql from "mysql2/promise";
import chalk from "chalk";

// Crear la conexión con la base de datos usando `mysql2` y `Promise`.
export const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  //   password: 'tu_contraseña',
  database: "book-review",
});

try {
  await connection.connect();
  console.log(
    chalk.green.inverse.bold(
      " ------------------------------------ \n" +
        "  Conectado a la base de datos MySQL  " +
        "\n ------------------------------------ "
    )
  );
} catch (err) {
  console.error(
    chalk.red.inverse.bold(
      " ------------------------------------ \n" +
        "  ❌ Error al conectar con la base de datos MySQL  " +
        "\n ------------------------------------ "
    )
  );
}
