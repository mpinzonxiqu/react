// /pages/api/favorites/toggleFavorite.js

import db from '../../db'; // Asegúrate de tener tu conexión a la base de datos
import jwt from 'jsonwebtoken';

const secretKey = 'mi_secreto_jwt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { movieId } = req.body;
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const token = authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, secretKey);
            const userId = decoded.userId;
            const favorite = await db.query(
                'SELECT * FROM favorites WHERE userId = ? AND movieId = ?',
                [userId, movieId]
            );

            if (favorite.length > 0) {
                await db.query(
                    'DELETE FROM favorites WHERE userId = ? AND movieId = ?',
                    [userId, movieId]
                );
                res.status(200).json({ message: 'Película desmarcada como favorita' });
            } else {

                await db.query(
                    'INSERT INTO favorites (userId, movieId) VALUES (?, ?)',
                    [userId, movieId]
                );
                res.status(201).json({ message: 'Película marcada como favorita' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al gestionar favoritos' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
