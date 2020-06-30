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
      moviesList = {[
        {title: `Fantastic Beasts: The Crimes of Grindelwald`, genre: `Kids & Family`, year: 2016},
        {title: `Bohemian Rhapsody`, genre: `Drama`, year: 2018},
        {title: `Macbeth`, genre: `Drama`, year: 2015},
        {title: `Aviator`, genre: `Drama`, year: 2004}
      ]}
    />).toJSON;

  expect(tree).toMatchSnapshot();
});
