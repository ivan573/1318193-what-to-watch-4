import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Intercations with the movie card are succesfully handeled`, () => {
  it(`Mouse is over the card`, () => {
    const onMouseOver = jest.fn();

    const movieCard = shallow(
        <MovieCard
          key={`aviator`}
          isActive={false}
          movie={
            {title: `Aviator`,
              genre: `Drama`,
              year: 2004,
              id: `aviator`,
              image: `img/aviator.jpg`,
              preview: ``}}
          onMouseOverCard={onMouseOver}
          onMouseOutOfCard={() => {}}
          onCardClick={() => {}}
          allMovies={[]}
        />
    );

    movieCard.simulate(`mouseover`);

    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });

  it(`The mouse is out`, () => {
    const onMouseOut = jest.fn();

    const movieCard = shallow(
        <MovieCard
          key={`aviator`}
          isActive={false}
          movie={
            {title: `Aviator`,
              genre: `Drama`,
              year: 2004,
              id: `aviator`,
              image: `img/aviator.jpg`,
              preview: ``}}
          onMouseOverCard={() => {}}
          onMouseOutOfCard={onMouseOut}
          onCardClick={() => {}}
          allMovies={[]}
        />
    );

    movieCard.simulate(`mouseout`);

    expect(onMouseOut).toHaveBeenCalledTimes(1);
  });

  it(`The card title has been clicked on`, () => {
    const onCardClick = jest.fn();

    const movieCard = shallow(
        <MovieCard
          key={`aviator`}
          isActive={false}
          movie={
            {title: `Aviator`,
              genre: `Drama`,
              year: 2004,
              id: `aviator`,
              image: `img/aviator.jpg`,
              preview: ``}}
          onMouseOverCard={() => {}}
          onMouseOutOfCard={() => {}}
          onCardClick={onCardClick}
          allMovies={[]}
        />
    );

    const title = movieCard.find(`.small-movie-card__link`);

    title.simulate(`click`, {
      preventDefault: () => {
      }
    });

    expect(onCardClick).toHaveBeenCalledTimes(1);
  });
});
