import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import ReturnIcon from "../icons/return.svg";

const IMG_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const backState = location.state?.backState;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getMovieDetails(id);
        if (!ignore) setMovie(data);
      } catch (err) {
        console.error(err);
        if (!ignore) setError("Could not load movie details.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  function handleBack() {
    navigate("/movies", { state: backState || null });
  }

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p>No movie found.</p>;

  return (
    <div className="movie-details-page">
        <button type="button" className="icon-btn back-btn" onClick={handleBack}>
        <img src={ReturnIcon} alt="return" className="icon" />
        <span>Return to Search</span>
        </button>
        <p></p>
      <div className="movie-detail-card">
        <div className="movie-detail-header">
          {movie.poster_path ? (
            <img
              className="movie-detail-poster"
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className="movie-detail-poster placeholder">No Poster</div>
          )}

          <div>
            <h2 className="movie-detail-title">
              {movie.title} {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
            </h2>

            <p className="movie-detail-meta">
              ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"} • Votes:{" "}
              {typeof movie.vote_count === "number" ? movie.vote_count : "N/A"}
            </p>

            {movie.genres?.length > 0 && (
              <p className="movie-detail-meta">
                Genres: {movie.genres.map((g) => g.name).join(", ")}
              </p>
            )}

            {typeof movie.runtime === "number" && (
              <p className="movie-detail-meta">Runtime: {movie.runtime} min</p>
            )}
          </div>
        </div>

        <div className="movie-detail-body">
          <h3>Description</h3>
          <p>{movie.overview || "No description available."}</p>
        </div>
      </div>

      <div className="tmdb-attribution">
        <p>Search provided by TMDB.</p>
      </div>
    </div>
  );
}
