import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '88c4f070f4d9ecc67dc87ec825889ff8'; // Asegúrate de colocar tu clave API correcta

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const fetchGenres = async () => {
      try {
        const genreResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        setGenres(genreResponse.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchMovies();
    fetchGenres();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = selectedGenre ? movie.genre_ids.includes(Number(selectedGenre)) : true;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-4">Peliculas de Estreno</h1>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-control"
            onChange={handleGenreChange}
            value={selectedGenre}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">Release Date: {movie.release_date}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No movies found</p>
        )}
      </div>
    </div>
  );
}
