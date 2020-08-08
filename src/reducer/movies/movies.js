import {ALL_GENRES, MOVIES_TO_SHOW_AT_ONCE} from "../../const.js";

const initialState = {
  playingMovie: null,
  activeMovie: null,
  moviesList: [],
  shownMovies: [],
  areAllMoviesShown: true
};

const ActionType = {
  CHANGE_PLAYING_MOVIE: `CHANGE_PLAYING_MOVIE`,
  CHANGE_ACTIVE_MOVIE: `CHANGE_ACTIVE_MOVIE`,
  CHANGE_FILTER: `CHANGE_FILTER`,
  SHOW_MORE: `SHOW_MORE`
};

const ActionCreator = {
  changePlayingMovie: (movie) => ({
    type: ActionType.CHANGE_PLAYING_MOVIE,
    payload: {playingMovie: movie}
  }),
  changeActiveMovie: (movie, allMovies) => ({
    type: ActionType.CHANGE_ACTIVE_MOVIE,
    payload: {activeMovie: movie, allMovies}
  }),
  changeFilter: (filterGenre, allMovies) => ({
    type: ActionType.CHANGE_FILTER,
    payload: {genre: filterGenre, allMovies}
  }),
  showMore: (movies) => ({
    type: ActionType.SHOW_MORE,
    payload: {movies}
  })
};

const reducer = (state = initialState, {type, payload}) => {
  let shownMovies;

  switch (type) {

    case (ActionType.CHANGE_PLAYING_MOVIE):

      return Object.assign({}, state, {playingMovie: payload.playingMovie});

    case (ActionType.CHANGE_ACTIVE_MOVIE):

      const similarMovies = payload.allMovies.filter((movie) => movie.genre === payload.activeMovie.genre && movie.title !== payload.activeMovie.title);

      shownMovies = similarMovies.slice(0, MOVIES_TO_SHOW_AT_ONCE);

      return Object.assign({}, state, {
        activeMovie: payload.activeMovie,
        moviesList: similarMovies,
        shownMovies,
        areAllMoviesShown: similarMovies.length === shownMovies.length
      });

    case (ActionType.CHANGE_FILTER):

      const list = payload.genre === ALL_GENRES ? payload.allMovies : payload.allMovies.filter(
          (movie) => movie.genre === payload.genre);

      shownMovies = list.slice(0, MOVIES_TO_SHOW_AT_ONCE);

      return Object.assign({}, state, {
        moviesList: list,
        shownMovies,
        areAllMoviesShown: list.length === shownMovies.length
      });

    case (ActionType.SHOW_MORE):

      shownMovies = state.shownMovies.concat(payload.movies.slice(state.shownMovies.length, state.shownMovies.length + MOVIES_TO_SHOW_AT_ONCE));

      return Object.assign({}, state, {
        shownMovies,
        areAllMoviesShown: payload.movies.length === shownMovies.length
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
