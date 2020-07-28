import {extend} from "./utils.js";
import {moviesList} from "./mocks/movies.js";

import {ALL_GENRES} from "./const.js";

// const ALL_GENRES = `All genres`;

const initialState = {
  genre: ALL_GENRES,
  moviesList
};

const ActionType = {
  CHANGE_FILTER: `CHANGE_FILTER`,
  // GET_LIST: `GET_LIST`
};

const ActionCreator = {
  changeFilter: (filterGenre) => ({
    type: ActionType.CHANGE_FILTER,
    genre: filterGenre
  }),

  // getList: () => ({
  //   type: ActionType.GET_LIST
  // })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case (ActionType.CHANGE_FILTER):
      const list = action.genre === ALL_GENRES ? moviesList : moviesList.filter(
          (movie) => movie.genre === action.genre);
      return extend(state, {
        genre: action.genre,
        moviesList: list
      });

  //   case (ActionType.GET_LIST):
  //     const list = state.genre === ALL_GENRES ? state.movies : state.movies.filter(
  //         (movie) => movie.genre === state.genre);
  //     return extend(state, {movies: list});
  // }
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
