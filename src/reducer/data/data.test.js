import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";
import {ActionType as MoviesActionType} from "../movies/movies.js";

import {adaptMovies} from "../../utils.js";

import {allMoviesUnadapted} from "./all-movies-unadapted.js";

const allMovies = adaptMovies(allMoviesUnadapted);

const reviews = [{
  id: 1,
  user: {
    id: 4,
    name: `Kate Muir`
  },
  rating: 8.9,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  date: `2019-05-08T14:13:56.569Z`}];

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    allMovies: [],
    reviews: {}
  });
});

it(`Reducer should update movies by load movies`, () => {
  expect(reducer({
    allMovies: []
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: {allMovies},
  })).toEqual({
    allMovies
  });
});

it(`Reducer should update reviews by load reviews`, () => {
  expect(reducer({
    reviews: {}
  }, {
    type: ActionType.POST_REVIEW,
    payload: {reviews, id: 1}
  })).toEqual({
    reviews: {
      1: reviews
    }
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: MoviesActionType.CHANGE_FILTER,
          payload: {allMovies: adaptMovies([{fake: true}]), genre: `All genres`},
        });
      });
  });

  it(`Should make a correct API call to /comments`, function () {
    const id = 1;
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewPoster = Operation.postReview(1, 10, `Review`);

    apiMock
      .onPost(`/comments/${id}`)
      .reply(200, [{fake: true}]);

    return reviewPoster(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.POST_REVIEW,
          payload: {reviews: [{fake: true}], id},
        });
      });
  });
});
