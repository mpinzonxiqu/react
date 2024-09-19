import pool from '../../lib/db'; // Asegúrate de que la ruta a 'db.js' sea correcta

export default async function handler(req, res) {
  const { id } = req.query; // Obtenemos el ID desde la URL

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Si el usuario se encuentra
      return res.status(200).json(rows[0]);
    } catch (error) {
      // En caso de error con la base de datos o cualquier otro error
      console.error('Error al buscar usuario:', error.message);
      return res.status(500).json({ message: 'Error al buscar usuario', error: error.message });
    }
  } else {
    // Si se utiliza un método que no es GET
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }
}
