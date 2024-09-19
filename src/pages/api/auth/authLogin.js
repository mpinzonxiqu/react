// /pages/api/auth/authLogin.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../../db'; 

const secretKey = '88c4f070f4d9ecc67dc87ec825889ff8'; 

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const user = await db.query(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );
            
            if (user.length === 0) {
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }

            const isMatch = await bcrypt.compare(password, user[0].password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign({ userId: user[0].id }, secretKey, { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
