import {ALL_GENRES} from "./const.js";

const getUniqueGenres = (movies) => {

  const genres = movies.reduce((unique, item) => {
    return unique.includes(item.genre) ? unique : [...unique, item.genre];
  }, []);

  genres.unshift(ALL_GENRES);

  return genres;
};

const adaptMovies = (movies) => {
  return movies.map((movie) => {
    return {
      title: movie.name,
      genre: movie.genre,
      year: movie.released,
      id: movie.id,
      image: movie.preview_image,
      poster: movie.poster_image,
      background: movie.background_image,
      color: movie.background_color,
      description: movie.description,
      rating: movie.rating,
      scoresCount: movie.scores_count,
      director: movie.director,
      actors: movie.starring,
      duration: movie.run_time,
      isFavorite: movie.is_favorite,
      preview: movie.preview_video_link,
      video: movie.video_link
    };
  });
};

const updateMovies = (movies, movie, id) => {
  const movieIndex = movies.findIndex((it) => {
    return it.id === id;
  });

  if (movieIndex >= 0) {
    const newMovies = movies.slice();

    newMovies[movieIndex] = movie;

    return newMovies;
  }

  return movies;
};

const getMovieById = (id, movies) => {
  const idToFind = Number(id);
  return movies.find((it) => {
    return it.id === idToFind;
  });
};

const getMovieReviews = (id, reviews, getReviews) => {
  const movieReviews = reviews[id];

  if (movieReviews) {
    return movieReviews;
  }

  return getReviews(id);
};

export {getUniqueGenres, adaptMovies, updateMovies, getMovieById, getMovieReviews};
