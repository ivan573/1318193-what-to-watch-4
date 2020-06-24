import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

test(`App matches snapshot`, () => {
  const tree = renderer
    .create(<App
      headerMovie = {{
        title: `The Grand Budapest Hotel`,
        genre: `Drama`,
        year: 2014
      }}
      moviesList = {[`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`]}
    />).toJSON;

  expect(tree).toMatchSnapshot();
});
