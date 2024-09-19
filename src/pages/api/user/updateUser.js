import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query; // Obtener el ID del usuario desde la query
    const { username, email, password } = req.body; // Obtener los datos del cuerpo de la solicitud

    // Verificar que el ID esté presente
    if (!id) {
      return res.status(400).json({ message: 'ID de usuario es necesario' });
    }

    // Conexión a la base de datos
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'auth_db',
      });

      // Crear una lista de actualizaciones basadas en los datos proporcionados
      const updates = [];
      const params = [];

      if (username) {
        updates.push('username = ?');
        params.push(username);
      }

      if (email) {
        updates.push('email = ?');
        params.push(email);
      }

      if (password) {
        updates.push('password = ?');
        params.push(password);
      }

      // Asegúrate de que al menos un campo se actualice
      if (updates.length === 0) {
        return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
      }

      // Agregar el ID al final de los parámetros
      params.push(id);

      // Construir la consulta SQL
      const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
      
      const [result] = await connection.execute(query, params);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario actualizado correctamente' });

      // Cerrar la conexión
      connection.end();
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
