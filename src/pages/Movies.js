import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import SearchIcon from "../icons/search.svg";

const IMG_BASE = "https://image.tmdb.org/t/p/w342";

export default function Movies() {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState(location.state?.query || "");
  const [results, setResults] = useState(location.state?.results || []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");

    try {
      const movies = await searchMovies(trimmed);
      setResults(movies);
    } catch (err) {
      console.error(err);
      setError("Could not fetch movies. Check your TMDB token and try again.");
    } finally {
      setLoading(false);
    }
  }

  function openDetails(movie) {
    navigate(`/movies/${movie.id}`, {
      state: { backState: { query, results } },
    });
  }

  return (
    <div className="movies-page">
      <h2>Movies</h2>

      <form onSubmit={handleSearch} className="movies-form">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit" className="icon-btn">
          <img src={SearchIcon} alt="Search" className="icon" />
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {results.map((movie) => (
          <button
            key={movie.id}
            type="button"
            className="movie-tile"
            onClick={() => openDetails(movie)}
          >
            {movie.poster_path ? (
              <img
                className="movie-tile-poster"
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="movie-tile-poster placeholder">No Poster</div>
            )}

            <div className="movie-tile-text">
              <div className="movie-tile-title">{movie.title}</div>
              <div className="movie-tile-sub">
                {movie.release_date ? movie.release_date.slice(0, 4) : "—"}
                {" • "}
                ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="tmdb-attribution">
        <p>Search provided by TMDB.</p>
      </div>
    </div>
  );
}
