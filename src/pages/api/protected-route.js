// /pages/api/protected-route.js

import jwt from 'jsonwebtoken';

const secretKey = '88c4f070f4d9ecc67dc87ec825889ff8';

export default async function handler(req, res) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        // El token es válido, puedes acceder a los datos del usuario
        res.status(200).json({ message: 'Acceso concedido', userId: decoded.userId });
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
}
