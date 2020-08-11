import {ALL_GENRES} from "../../const.js";
import {adaptMovies, updateMovies} from "../../utils.js";

import {ActionCreator as MovieActionCreator} from "../movies/movies.js";

const initialState = {
  allMovies: [],
  favoriteMovies: [],
  reviews: {},
  promoMovie: {}
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  GET_REVIEWS: `GET_REVIEWS`,
  ADD_TO_FAVORITES: `ADD_TO_FAVORITES`,
  GET_FAVORITES: `GET_FAVORITES`,
  GET_PROMO_MOVIE: `GET_PROMO_MOVIE`
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
  getReviews: (reviews, id) => ({
    type: ActionType.GET_REVIEWS,
    payload: {reviews, id}
  }),
  addToFavorites: (movie, id) => ({
    type: ActionType.ADD_TO_FAVORITES,
    payload: {movie, id}
  }),
  getFavorites: (movies) => ({
    type: ActionType.GET_FAVORITES,
    payload: {movies}
  }),
  getPromoMovie: (movie) => ({
    type: ActionType.GET_PROMO_MOVIE,
    payload: {movie}
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
      dispatch(ActionCreator.getReviews(response.data, id));
    });
  },
  getReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`).
    then((response) => {
      dispatch(ActionCreator.getReviews(response.data, id));
    });
  },
  addToFavorites: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`)
    .then((response) => {
      const movie = adaptMovies([response.data])[0];
      dispatch(ActionCreator.addToFavorites(movie, id));
      dispatch(MovieActionCreator.updateMovie(movie));
    });
  },
  getFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
    .then((response) => {
      dispatch(ActionCreator.getFavorites(adaptMovies(response.data)));
    });
  },
  getPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
    .then((response) => {
      dispatch(ActionCreator.getPromoMovie(adaptMovies([response.data])[0]));
    });
  }
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case (ActionType.LOAD_MOVIES):

      const allMovies = payload.allMovies;

      return Object.assign({}, state, {allMovies});

    case (ActionType.GET_REVIEWS):

      return Object.assign({}, state, {reviews: {[payload.id]: payload.reviews}});

    case (ActionType.ADD_TO_FAVORITES):

      const newAllMovies = updateMovies(state.allMovies, payload.movie, payload.id);

      if (payload.movie.id === state.promoMovie.id) {
        return Object.assign({}, state, {allMovies: newAllMovies, promoMovie: payload.movie});
      }

      return Object.assign({}, state, {allMovies: newAllMovies});

    case (ActionType.GET_FAVORITES):

      return Object.assign({}, state, {favoriteMovies: payload.movies});

    case (ActionType.GET_PROMO_MOVIE):

      return Object.assign({}, state, {promoMovie: payload.movie});
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator, IsFavoriteStatus};
