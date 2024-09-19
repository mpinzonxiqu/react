import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


const API_KEY = '88c4f070f4d9ecc67dc87ec825889ff8'; // Reemplaza con tu clave de la API de TMDb

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
          );
          setMovie(response.data);
          setLoading(false);
        } catch (error) {
          setError('Error fetching movie details');
          setLoading(false);
        }
      };

      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: '300px', marginBottom: '20px' }}
      />
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}/10</p>
      <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
    </div>
  );
}



