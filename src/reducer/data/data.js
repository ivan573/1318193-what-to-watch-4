import {ALL_GENRES} from "../../const.js";
import {adaptMovies} from "../../utils.js";

import {ActionCreator as MovieActionCreator} from "../movies/movies.js";

const initialState = {
  allMovies: [],
  reviews: {}
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  POST_REVIEW: `POST_REVIEW`
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: {allMovies: movies}
  }),
  getReview: (reviews, id) => ({
    type: ActionType.POST_REVIEW,
    payload: {reviews, id}
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
  },
  postReview: (id, rating, comment) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, {rating, comment})
    .then((response) => {
      dispatch(ActionCreator.getReview(response.data, id));
    });
  }
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case (ActionType.LOAD_MOVIES):

      const allMovies = payload.allMovies;

      return Object.assign({}, state, {allMovies});

    case (ActionType.POST_REVIEW):

      return Object.assign({}, state, {reviews: {[payload.id]: payload.reviews}});
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
