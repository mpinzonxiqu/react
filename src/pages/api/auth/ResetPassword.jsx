import React, { useState } from 'react';
import { useRouter } from 'next/router';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const { token } = router.query; // Obtener el token de la URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }

        const response = await fetch('/api/auth/resetPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('Contraseña restablecida con éxito.');
            setTimeout(() => router.push('/login'), 3000);
        } else {
            setMessage(data.error || 'Hubo un error, intenta nuevamente.');
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nueva Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Restablecer Contraseña</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPassword;
