import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const SECRET_KEY = '011b0a36-4dbd-471e-b504-88bcbed55cd8';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña son necesarios' });
    }

    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'auth_db',
      });

      const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }

      const user = rows[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({ token });

      connection.end();
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
