import {reducer, ActionCreator, ActionType} from "./reducer.js";
import {ALL_GENRES} from "./const.js";
import {moviesList} from "./mocks/movies.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: ALL_GENRES,
    moviesList
  });
});

it(`Reducer should change the genre and the movies list when gets a genre`, () => {
  expect(reducer({
    genre: ALL_GENRES,
    moviesList
  }, {
    type: ActionType.CHANGE_FILTER,
    genre: `Kids & Family`
  })).toEqual({
    genre: `Kids & Family`,
    moviesList: [
      {title: `Fantastic Beasts: The Crimes of Grindelwald`,
        genre: `Kids & Family`,
        year: 2016, id: `fantastic-beasts-the-crimes-of-grindelwald`,
        image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`}
    ]
  });
});

it(`Action creator returns new genre when the filter is changed`, () => {
  expect(ActionCreator.changeFilter(`Kids & Family`)).toEqual({
    type: ActionType.CHANGE_FILTER,
    genre: `Kids & Family`
  });
});
