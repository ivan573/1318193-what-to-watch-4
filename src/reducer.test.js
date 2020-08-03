import {reducer, ActionCreator, ActionType} from "./reducer.js";
import {moviesList} from "./mocks/movies.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeMovie: null,
    moviesList,
    shownMovies: moviesList.slice(0, 8),
    areAllMoviesShown: false
  });
});

it(`Reducer changes movies list and shown movies accordingly when a an active movie is received`, () => {
  expect(reducer({moviesList}, {
    type: ActionType.CHANGE_ACTIVE_MOVIE,
    payload: {activeMovie:
      {
        title: `What We Do in the Shadows`,
        genre: `Comedy`,
        year: 2014,
        id: `what-we-do-in-the-shadows`,
        image: `img/what-we-do-in-the-shadows.jpg`,
        preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
      }}
  })).toEqual({
    activeMovie: {
      title: `What We Do in the Shadows`,
      genre: `Comedy`,
      year: 2014,
      id: `what-we-do-in-the-shadows`,
      image: `img/what-we-do-in-the-shadows.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
    },
    moviesList: [{
      title: `Johnny English`,
      genre: `Comedy`,
      year: 2003,
      id: `johnny-english`,
      image: `img/johnny-english.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}],
    shownMovies: [{
      title: `Johnny English`,
      genre: `Comedy`,
      year: 2003,
      id: `johnny-english`,
      image: `img/johnny-english.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}],
    areAllMoviesShown: true
  });
});

it(`Reducer should change the movies list when gets a genre`, () => {
  expect(reducer({moviesList}, {
    type: ActionType.CHANGE_FILTER,
    payload: {genre: `Kids & Family`}
  })).toEqual({
    moviesList: [
      {title: `Fantastic Beasts: The Crimes of Grindelwald`,
        genre: `Kids & Family`,
        year: 2016, id: `fantastic-beasts-the-crimes-of-grindelwald`,
        image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`},
      // temporary
      {title: `Fantastic Beasts: The Crimes of Grindelwald`,
        genre: `Kids & Family`,
        year: 2016, id: `fantastic-beasts-the-crimes-of-grindelwald2`,
        image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`}
    ],
    shownMovies: [
      {title: `Fantastic Beasts: The Crimes of Grindelwald`,
        genre: `Kids & Family`,
        year: 2016, id: `fantastic-beasts-the-crimes-of-grindelwald`,
        image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`},
      // temporary
      {title: `Fantastic Beasts: The Crimes of Grindelwald`,
        genre: `Kids & Family`,
        year: 2016, id: `fantastic-beasts-the-crimes-of-grindelwald2`,
        image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`}
    ],
    areAllMoviesShown: true
  });
});

it(`Reducer increases the number of movies displayed by a number up to 8 if there are more of them to display`, () => {
  expect(reducer({
    moviesList,
    shownMovies: moviesList.slice(0, 8)
  }, {
    type: ActionType.SHOW_MORE,
    payload: {movies: moviesList.slice(0, 8)}
  })).toEqual({
    moviesList,
    shownMovies: moviesList,
    areAllMoviesShown: true
  });
});

it(`Acion creator returns a new active movie`, () => {
  expect(ActionCreator.changeActiveMovie({
    title: `What We Do in the Shadows`,
    genre: `Comedy`,
    year: 2014,
    id: `what-we-do-in-the-shadows`,
    image: `img/what-we-do-in-the-shadows.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  })).toEqual({
    type: ActionType.CHANGE_ACTIVE_MOVIE,
    payload: {activeMovie: {
      title: `What We Do in the Shadows`,
      genre: `Comedy`,
      year: 2014,
      id: `what-we-do-in-the-shadows`,
      image: `img/what-we-do-in-the-shadows.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
    }}
  });
});

it(`Action creator returns new genre when the filter is changed`, () => {
  expect(ActionCreator.changeFilter(`Kids & Family`)).toEqual({
    type: ActionType.CHANGE_FILTER,
    payload: {genre: `Kids & Family`}
  });
});

it(`Action creator returns the list of shown movies when the show more function is called`, () => {
  expect(ActionCreator.showMore([{
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `Kids & Family`,
    year: 2016, id: `fantastic-beasts-the-crimes-of-grindelwald`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  }])).toEqual({
    type: ActionType.SHOW_MORE,
    payload: {movies: [{
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      genre: `Kids & Family`,
      year: 2016, id: `fantastic-beasts-the-crimes-of-grindelwald`,
      image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    }]}
  });
});
