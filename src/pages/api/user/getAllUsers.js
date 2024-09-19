import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Conexión a la base de datos
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'auth_db',
      });

      // Consulta SQL para obtener todos los usuarios
      const [rows] = await connection.execute('SELECT * FROM users');

      if (rows.length === 0) {
        return res.status(404).json({ message: 'No hay usuarios disponibles' });
      }

      // Devolver todos los usuarios
      res.status(200).json(rows);

      // Cerrar la conexión
      connection.end();
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
