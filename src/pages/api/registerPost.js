import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
    }

    // Conexión a la base de datos
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'auth_db',
    });

    try {
      // Verifica si el usuario ya existe
      const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

      if (rows.length > 0) {
        return res.status(409).json({ message: 'El usuario ya existe.' });
      }

      // Encripta la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Inserta el nuevo usuario en la base de datos
      await connection.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );

      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error });
    } finally {
      connection.end();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
