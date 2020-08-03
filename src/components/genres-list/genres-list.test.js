import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

test(`Genres list matches snapshot`, () => {
  const tree = renderer
    .create(<GenresList
      genres={[`All genres`, `Kids & Family`, `Drama`, `Comedy`]}
      activeGenre={`All genres`}
      onGenreClick={() => {}}
      changeActiveItem={() => {}}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
