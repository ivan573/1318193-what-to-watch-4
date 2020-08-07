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
  changeActiveMovie: (movie) => ({
    type: ActionType.CHANGE_ACTIVE_MOVIE,
    payload: {activeMovie: movie}
  }),
  changeFilter: (filterGenre) => ({
    type: ActionType.CHANGE_FILTER,
    payload: {genre: filterGenre}
  }),
  showMore: (movies) => ({
    type: ActionType.SHOW_MORE,
    payload: {movies}
  })
};

const reducer = (state = initialState, {type, payload}) => {
  let shownMovies;

  switch (type) {

    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: payload,
      });

    case (ActionType.CHANGE_PLAYING_MOVIE):

      return Object.assign({}, state, {playingMovie: payload.playingMovie});

    case (ActionType.CHANGE_ACTIVE_MOVIE):

      const similarMovies = state.allMovies.filter((movie) => movie.genre === payload.activeMovie.genre && movie.title !== payload.activeMovie.title);

      shownMovies = similarMovies.slice(0, MOVIES_TO_SHOW_AT_ONCE);

      return Object.assign({}, state, {
        activeMovie: payload.activeMovie,
        moviesList: similarMovies,
        shownMovies,
        areAllMoviesShown: similarMovies.length === shownMovies.length
      });

    case (ActionType.CHANGE_FILTER):

      const list = payload.genre === ALL_GENRES ? state.allMovies : state.allMovies.filter(
          (movie) => movie.genre === payload.genre);

      shownMovies = list.slice(0, MOVIES_TO_SHOW_AT_ONCE);

      return Object.assign({}, state, {
        moviesList: list,
        shownMovies,
        areAllMoviesShown: list.length === shownMovies.length
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
