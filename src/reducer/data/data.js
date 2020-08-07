import {MOVIES_TO_SHOW_AT_ONCE} from "../../const.js";
import {adaptMovies} from "../../utils.js";

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
        dispatch(ActionCreator.loadMovies(response.data));
      });
  }
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case (ActionType.LOAD_MOVIES):

      const allMovies = adaptMovies(payload.allMovies);
      const shownMovies = allMovies.slice(0, MOVIES_TO_SHOW_AT_ONCE);

      return Object.assign({}, state, {
        allMovies,
        moviesList: allMovies,
        shownMovies,
        areAllMoviesShown: allMovies.length === shownMovies.length
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
