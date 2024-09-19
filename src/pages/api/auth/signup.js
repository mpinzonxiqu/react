// /pages/api/auth/signup.js

import bcrypt from 'bcrypt';
import db from '../../db'; 

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await db.query(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, hashedPassword]
            );

            res.status(201).json({ message: 'Usuario registrado con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar el usuario' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
