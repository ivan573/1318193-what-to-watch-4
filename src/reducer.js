import {moviesList} from "./mocks/movies.js";

import {ALL_GENRES} from "./const.js";

const initialState = {
  genre: ALL_GENRES,
  moviesList
};

const ActionType = {
  CHANGE_FILTER: `CHANGE_FILTER`
};

const ActionCreator = {
  changeFilter: (filterGenre) => ({
    type: ActionType.CHANGE_FILTER,
    genre: filterGenre
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case (ActionType.CHANGE_FILTER):
      const list = action.genre === ALL_GENRES ? moviesList : moviesList.filter(
          (movie) => movie.genre === action.genre);
      return Object.assign({}, state, {
        genre: action.genre,
        moviesList: list
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
