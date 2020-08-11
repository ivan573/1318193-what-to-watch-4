import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";
import {ActionType as MoviesActionType} from "../movies/movies.js";
import {adaptMovies} from "../../utils.js";

const allMoviesUnadapted = [
  {
    "name": `Gangs of new york`,
    "poster_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    "preview_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    "background_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    "background_color": `#A6B7AC`,
    "description": `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
    "rating": 8.8,
    "scores_count": 370881,
    "director": `Martin Scorsese`,
    "starring": [
      `Leonardo DiCaprio`,
      `Cameron Diaz`,
      `Daniel Day-Lewis`
    ],
    "run_time": 167,
    "genre": `Crime`,
    "released": 2002,
    "id": 1,
    "is_favorite": false,
    "video_link": `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    "preview_video_link": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    "name": `Moonrise Kingdom`,
    "poster_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Moonrise_Kingdom.jpg`,
    "preview_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/moonrise-kingdom.jpg`,
    "background_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Moonrise_Kingdom.jpg`,
    "background_color": `#D8E3E5`,
    "description": `A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.`,
    "rating": 7.9,
    "scores_count": 291183,
    "director": `Wes Anderson`,
    "starring": [
      `Jared Gilman`,
      `Kara Hayward`,
      `Bruce Willis`
    ],
    "run_time": 94,
    "genre": `Adventure`,
    "released": 2012,
    "id": 2,
    "is_favorite": false,
    "video_link": `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    "preview_video_link": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    "name": `Pulp Fiction`,
    "poster_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Pulp_Fiction.jpg`,
    "preview_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/pulp-fiction.jpg`,
    "background_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Pulp_Fiction.jpg`,
    "background_color": `#795433`,
    "description": `The lives of two mob hitmen, a boxer, a gangster & his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.`,
    "rating": 1.5,
    "scores_count": 1635992,
    "director": `Quentin Tarantino`,
    "starring": [
      `John Travolta`,
      `Uma Thurman`,
      `Samuel L. Jackson`
    ],
    "run_time": 153,
    "genre": `Crime`,
    "released": 1994,
    "id": 3,
    "is_favorite": false,
    "video_link": `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    "preview_video_link": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  }
];

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
      favoriteMovies: [
        {
          "name": `Bronson`,
          "poster_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/bronson.jpg`,
          "preview_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/bronson.jpg`,
          "background_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/bronson.jpg`,
          "background_color": `#73B39A`,
          "description": `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
          "rating": 3.6,
          "scores_count": 109661,
          "director": `Nicolas Winding Refn`,
          "starring": [
            `Tom Hardy`,
            `Kelly Adams`,
            `Luing Andrews`
          ],
          "run_time": 92,
          "genre": `Action`,
          "released": 2008,
          "id": 4,
          "is_favorite": false,
          "video_link": `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
          "preview_video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
        }
      ]
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
  it(`Should make a correct API call to /films and adapt movies`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, allMoviesUnadapted);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: MoviesActionType.CHANGE_FILTER,
          payload: {allMovies, genre: `All genres`},
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
          type: ActionType.GET_REVIEWS,
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
          type: ActionType.GET_FAVORITES,
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
          type: ActionType.GET_PROMO_MOVIE,
          payload: {movie: allMovies[0]},
        });
      });
  });

});
