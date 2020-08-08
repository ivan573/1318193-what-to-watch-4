import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.MOVIES;


const getPlayingMovie = (state) => {
  return state[NAME_SPACE].playingMovie;
};

const getActiveMovie = (state) => {
  return state[NAME_SPACE].activeMovie;
};

const getMoviesList = (state) => {
  return state[NAME_SPACE].moviesList;
};

const getShownMovies = (state) => {
  return state[NAME_SPACE].shownMovies;
};

const getAreAllMoviesShown = (state) => {
  return state[NAME_SPACE].areAllMoviesShown;
};

export {getPlayingMovie, getActiveMovie, getMoviesList, getShownMovies, getAreAllMoviesShown};
