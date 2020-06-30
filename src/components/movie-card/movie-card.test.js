import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

test(`MovieCard matches snapshot`, () => {
  const tree = renderer
    .create(<MovieCard
      key={`aviator`}
      movieName={`Aviator`}
      onCardHover={() => {}}
    />).toJSON;

  expect(tree).toMatchSnapshot();
});
