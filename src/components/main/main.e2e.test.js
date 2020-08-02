import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

const moviesList = [
  {title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `Kids & Family`,
    year: 2016,
    id: `fantastic-beasts-the-crimes-of-grindelwald`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`},
  {title: `Bohemian Rhapsody`,
    genre: `Drama`,
    year: 2018,
    id: `bohemian-rhapsody`,
    image: `img/bohemian-rhapsody.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`},
  {title: `Macbeth`,
    genre: `Drama`,
    year: 2015,
    id: `macbeth`,
    image: `img/macbeth.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`},
  {title: `Aviator`,
    genre: `Drama`,
    year: 2004,
    id: `aviator`,
    image: `img/aviator.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}
];

it(`Title is clicked on`, () => {
  const onTitleClick = jest.fn();

  const main = shallow(
      <Main
        headerMovie = {{
          title: `The Grand Budapest Hotel`,
          genre: `Drama`,
          year: 2014
        }}
        moviesList = {moviesList}
        uniqueGenres={[`All genres`, `Kids & Family`, `Drama`]}
        activeGenre={`All genres`}
        areAllMoviesShown={true}
        onTitleClick = {onTitleClick}
        onCardClick={() => {}}
        onGenreClick={() => {}}
        onShowMoreClick={() => {}}
      />
  );

  const title = main.find(`.movie-card__title`);

  title.simulate(`click`);

  expect(onTitleClick).toHaveBeenCalledTimes(1);
});
