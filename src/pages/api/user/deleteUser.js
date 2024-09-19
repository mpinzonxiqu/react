import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'DELETE') { 
    const { id } = req.query; 

    if (!id) {
      return res.status(400).json({ message: 'ID de usuario es necesario' });
    }

    try {
  
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'auth_db',
      });

     
      const [result] = await connection.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario eliminado correctamente' });

      
      connection.end();
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
