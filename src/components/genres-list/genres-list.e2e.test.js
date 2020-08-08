import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenresList from "./genres-list.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const genres = [`All genres`, `Kids & Family`, `Drama`, `Comedy`];

it(`Genres are clicked on`, () => {
  const onGenreClick = jest.fn();

  const main = shallow(
      <GenresList
        genres={genres}
        activeGenre={`All genres`}
        onGenreClick={onGenreClick}
        changeActiveItem={() => {}}
        allMovies={[]}
      />
  );

  const genreElements = main.find(`.catalog__genres-item`);

  genreElements.forEach((element) => {
    element.simulate(`click`);
  });

  expect(onGenreClick).toHaveBeenCalledTimes(genres.length);
});
