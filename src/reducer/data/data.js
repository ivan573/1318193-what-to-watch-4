import {ALL_GENRES} from "../../const.js";
import {adaptMovies} from "../../utils.js";

import {ActionCreator as MovieActionCreator} from "../movies/movies.js";

const initialState = {
  allMovies: []
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: {allMovies: movies}
  })
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const movies = adaptMovies(response.data);
        dispatch(ActionCreator.loadMovies(movies));
        dispatch(MovieActionCreator.changeFilter(ALL_GENRES, movies));
      });
  }
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case (ActionType.LOAD_MOVIES):

      const allMovies = payload.allMovies;

      return Object.assign({}, state, {
        allMovies
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
