import { compare } from 'bcryptjs';
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {

      const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      const user = rows[0];
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Aquí puedes generar un token JWT y devolverlo si deseas manejar autenticación basada en token
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      return res.status(500).json({ message: 'Error al realizar el inicio de sesión', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Método no permitido' });
  }
}
