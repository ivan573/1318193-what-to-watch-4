import {moviesList} from "./mocks/movies.js";

import {ALL_GENRES} from "./const.js";

const MOVIES_TO_SHOW_AT_ONCE = 8;

const initialState = {
  genre: ALL_GENRES,
  moviesList,
  shownMovies: moviesList.slice(0, MOVIES_TO_SHOW_AT_ONCE),
  areAllMoviesShown: moviesList.length === moviesList.slice(0, MOVIES_TO_SHOW_AT_ONCE).length
};

const ActionType = {
  CHANGE_FILTER: `CHANGE_FILTER`,
  SHOW_MORE: `SHOW_MORE`
};

const ActionCreator = {
  changeFilter: (filterGenre) => ({
    type: ActionType.CHANGE_FILTER,
    genre: filterGenre
  }),
  showMore: (movies) => ({
    type: ActionType.SHOW_MORE,
    movies
  })
};

const reducer = (state = initialState, action) => {
  let shownMovies;

  switch (action.type) {

    case (ActionType.CHANGE_FILTER):

      const list = action.genre === ALL_GENRES ? moviesList : moviesList.filter(
          (movie) => movie.genre === action.genre);

      shownMovies = list.slice(0, MOVIES_TO_SHOW_AT_ONCE);

      return Object.assign({}, state, {
        genre: action.genre,
        moviesList: list,
        shownMovies,
        areAllMoviesShown: list.length === shownMovies.length
      });

    case (ActionType.SHOW_MORE):

      shownMovies = action.movies.concat(state.moviesList.slice(action.movies.length));

      return Object.assign({}, state, {
        shownMovies,
        areAllMoviesShown: state.moviesList.length === shownMovies.length
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
