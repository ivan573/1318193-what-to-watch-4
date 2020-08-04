import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

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

test(`Main matches snapshot`, () => {
  const tree = renderer
    .create(<Main
      headerMovie={{
        title: `The Grand Budapest Hotel`,
        genre: `Drama`,
        year: 2014
      }}
      moviesList = {moviesList}
      uniqueGenres={[`All genres`, `Kids & Family`, `Drama`]}
      activeGenre={`All genres`}
      areAllMoviesShown={true}
      onCardClick={() => {}}
      onGenreClick={() => {}}
      onShowMoreClick={() => {}}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
