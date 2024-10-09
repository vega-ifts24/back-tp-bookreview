// back/database/index.js
import mysql from 'mysql2/promise';

// Crear la conexión con la base de datos usando `mysql2` y `Promise`.
export const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
//   password: 'tu_contraseña',
  database: 'book-review',
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});
