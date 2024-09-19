import React, { useState } from 'react';

function ResetPasswordRequest() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Enviar la solicitud al backend
        const response = await fetch('/api/auth/resetPasswordRequest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('Se ha enviado un enlace de restablecimiento a tu correo.');
        } else {
            setMessage(data.error || 'Hubo un error, intenta nuevamente.');
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Solicitar Restablecimiento</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPasswordRequest;
