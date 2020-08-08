import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

test(`MovieCard matches snapshot`, () => {
  const tree = renderer
    .create(<MovieCard
      key={`aviator`}
      movie={
        {title: `Aviator`,
          genre: `Drama`,
          year: 2004,
          id: `aviator`,
          image: `img/aviator.jpg`,
          preview: ``}}
      isActive={false}
      onMouseOverCard={() => {}}
      onMouseOutOfCard={() => {}}
      onCardClick={() => {}}
      allMovies={[]}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
