import { hash } from 'bcryptjs';
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
      // Verificar si el usuario ya existe
      const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length > 0) {
        return res.status(400).json({ message: 'El usuario ya está registrado' });
      }

      // Hash de la contraseña
      const hashedPassword = await hash(password, 10);

      // Insertar el nuevo usuario
      await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

      return res.status(200).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      return res.status(500).json({ message: 'Error al realizar el registro', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Método no permitido' });
  }
}
