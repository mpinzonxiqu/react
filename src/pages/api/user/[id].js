import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Conexión a la base de datos
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'auth_db',
      });

      // Consulta SQL para buscar el usuario por ID
      const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json(rows[0]); // Devuelve el usuario encontrado

      connection.end();
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
