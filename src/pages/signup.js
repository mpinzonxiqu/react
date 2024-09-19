import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { username, password });
      if (response.status === 200) {
        router.push('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <div className="container mt-5">
      {/* Imagen de cine centrada */}
      <div className="text-center mb-4">
        <img
          src="images\cinema.jpeg" // Ruta de la imagen en la carpeta public
          alt="Cine Online"
          className="img-fluid" // Clase de Bootstrap para que la imagen sea responsiva
          style={{ maxWidth: '100%', height: 'auto' }} // Ajusta el tamaño
        />
      </div>
      
      <h1 className="text-center mb-4">Registro Usuario Películas Premium</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Signup
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
}
