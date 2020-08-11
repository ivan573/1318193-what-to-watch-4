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

describe(`Reducer works correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      allMovies: [],
      favoriteMovies: [],
      promoMovie: {},
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

  it(`Reducer should update reviews by post/get reviews`, () => {
    expect(reducer({
      allMovies
    }, {
      type: ActionType.POST_REVIEW,
      payload: {movie: allMovies[0], id: 1}
    })).toEqual({
      allMovies
    });
  });

  it(`Reducer should update movies on add to favorites request`, () => {
    const id = 1;
    expect(reducer({
      allMovies, reviews, promoMovie: allMovies[0]
    }, {
      type: ActionType.ADD_TO_FAVORITES,
      payload: {movie: allMovies[0], reviews, id}
    })).toEqual({
      allMovies, reviews, promoMovie: allMovies[0]
    });
  });

  it(`Reducer should update favourite movies`, () => {
    expect(reducer({
    }, {
      type: ActionType.GET_FAVORITES,
      payload: {movies: allMovies}
    })).toEqual({
      favoriteMovies: allMovies
    });
  });

  it(`Reducer should update promo movie`, () => {
    expect(reducer({
    }, {
      type: ActionType.GET_PROMO_MOVIE,
      payload: {movie: allMovies[1]}
    })).toEqual({
      promoMovie: allMovies[1]
    });
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
      .reply(200, reviews);

    return reviewPoster(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `GET_REVIEWS`,
          payload: {reviews, id},
        });
      });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const toFavoriteAdder = Operation.addToFavorites(1, 1);

    apiMock
        .onPost(`/favorite/1/1`)
        .reply(200, allMoviesUnadapted[1]);

    return toFavoriteAdder(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          payload: {
            movie: {
              actors: [
                `Jared Gilman`,
                `Kara Hayward`,
                `Bruce Willis`
              ],
              background: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Moonrise_Kingdom.jpg`,
              color: `#D8E3E5`,
              description: `A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.`,
              director: `Wes Anderson`,
              duration: 94,
              genre: `Adventure`,
              id: 2,
              image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/moonrise-kingdom.jpg`,
              isFavorite: false,
              poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Moonrise_Kingdom.jpg`,
              preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
              rating: 7.9,
              scoresCount: 291183,
              title: `Moonrise Kingdom`,
              video: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
              year: 2012
            }
          },
          type: `UPDATE_MOVIE`
        });
      });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesGetter = Operation.getFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, allMoviesUnadapted);

    return favoritesGetter(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `GET_FAVORITES`,
          payload: {movies: allMovies},
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoGetter = Operation.getPromoMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, allMoviesUnadapted[0]);

    return promoGetter(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `GET_PROMO_MOVIE`,
          payload: {movie: allMovies[0]},
        });
      });
  });

});
