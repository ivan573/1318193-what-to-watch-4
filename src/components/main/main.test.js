import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

test(`Main matches snapshot`, () => {
  const tree = renderer
    .create(<Main
      headerMovie = {{
        title: `The Grand Budapest Hotel`,
        genre: `Drama`,
        year: 2014
      }}
      moviesList = {[`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`]}
    />).toJSON;

  expect(tree).toMatchSnapshot();
});
