import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";
import {ActionType as MoviesActionType} from "../movies/movies.js";

import {adaptMovies} from "../../utils.js";

import {allMoviesUnadapted} from "./all-movies-unadapted.js";

const allMovies = adaptMovies(allMoviesUnadapted);

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    allMovies: [],
  });
});

it(`Reducer should update movies by load movies`, () => {
  expect(reducer({
    allMovies: [],
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: {allMovies},
  })).toEqual({
    allMovies
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
});
