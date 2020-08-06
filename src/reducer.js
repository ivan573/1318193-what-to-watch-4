// import {moviesList} from "./mocks/movies.js";

import {adaptMovies} from "./utils.js";
import {ALL_GENRES} from "./const.js";

const MOVIES_TO_SHOW_AT_ONCE = 8;

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  playingMovie: null,
  activeMovie: null,
  allMovies: [],
  moviesList: [],
  shownMovies: [], // moviesList.slice(0, MOVIES_TO_SHOW_AT_ONCE),
  areAllMoviesShown: true // moviesList.length === moviesList.slice(0, MOVIES_TO_SHOW_AT_ONCE).length
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  CHANGE_PLAYING_MOVIE: `CHANGE_PLAYING_MOVIE`,
  CHANGE_ACTIVE_MOVIE: `CHANGE_ACTIVE_MOVIE`,
  CHANGE_FILTER: `CHANGE_FILTER`,
  SHOW_MORE: `SHOW_MORE`,
  LOAD_MOVIES: `LOAD_MOVIES`
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
  }),
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: {moviesList: movies}
  })
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
      });
  },
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

    case (ActionType.SHOW_MORE):

      shownMovies = state.shownMovies.concat(payload.movies.slice(state.shownMovies.length, state.shownMovies.length + MOVIES_TO_SHOW_AT_ONCE));

      return Object.assign({}, state, {
        shownMovies,
        areAllMoviesShown: payload.movies.length === shownMovies.length
      });

    case (ActionType.LOAD_MOVIES):

      const allMovies = adaptMovies(payload.moviesList);
      shownMovies = allMovies.slice(0, MOVIES_TO_SHOW_AT_ONCE);

      return Object.assign({}, state, {
        allMovies,
        moviesList: allMovies,
        shownMovies,
        areAllMoviesShown: allMovies.length === shownMovies.length
      });
  }

  return state;
};

export {reducer, AuthorizationStatus, ActionType, ActionCreator, Operation};
