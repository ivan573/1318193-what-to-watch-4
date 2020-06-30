import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Mouse is over the card`, () => {
  const onMouseOver = jest.fn();

  const movieCard = shallow(
      <MovieCard
        key={`aviator`}
        movieName={`Aviator`}
        onCardHover={onMouseOver}
      />
  );

  movieCard.simulate(`mouseover`);

  expect(onMouseOver).toHaveBeenCalledTimes(1);
});
