import {ALL_GENRES} from "../../const.js";
import {adaptMovies, updateMovies} from "../../utils.js";

import {ActionCreator as MovieActionCreator} from "../movies/movies.js";

const initialState = {
  allMovies: [],
  reviews: {}
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  POST_REVIEW: `POST_REVIEW`,
  ADD_TO_FAVORITES: `ADD_TO_FAVORITES`
};

const IsFavoriteStatus = {
  TRUE: 1,
  FALSE: 0
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: {allMovies: movies}
  }),
  getReview: (reviews, id) => ({
    type: ActionType.POST_REVIEW,
    payload: {reviews, id}
  }),
  addToFavorites: (movie, id) => ({
    type: ActionType.ADD_TO_FAVORITES,
    payload: {movie, id}
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
  },
  addToFavorites: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`)
    .then((response) => {
      const movie = adaptMovies([response.data])[0];
      dispatch(ActionCreator.addToFavorites(movie, id));
      dispatch(MovieActionCreator.updateMovie(movie));
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

    case (ActionType.ADD_TO_FAVORITES):

      return Object.assign({}, state, {allMovies: updateMovies(state.allMovies, payload.movie, payload.id)});
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator, IsFavoriteStatus};
