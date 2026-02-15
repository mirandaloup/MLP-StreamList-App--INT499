const TMDB_BASE = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
  const token = process.env.REACT_APP_TMDB_TOKEN;

  const url =
    TMDB_BASE +
    "/search/movie?query=" +
    encodeURIComponent(query) +
    "&include_adult=false&language=en-US&page=1";

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!res.ok) {
    throw new Error("TMDB request failed: " + res.status);
  }

  const data = await res.json();
  return data.results; 

  
}

export async function getMovieDetails(movieId) {
  const token = process.env.REACT_APP_TMDB_TOKEN;

  const res = await fetch(`${TMDB_BASE}/movie/${movieId}?language=en-US`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!res.ok) {
    throw new Error("TMDB details request failed: " + res.status);
  }

  return await res.json();
}
