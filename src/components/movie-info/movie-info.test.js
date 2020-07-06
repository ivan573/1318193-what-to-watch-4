import React from "react";
import renderer from "react-test-renderer";
import MovieInfo from "./movie-info.jsx";

test(`MovieInfo matches snapshot`, () => {
  const tree = renderer
    .create(<MovieInfo
      movie={{title: `Aviator`, genre: `Drama`, year: 2004}}
    />).toJSON;

  expect(tree).toMatchSnapshot();
});
