import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

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

test(`MovieCard matches snapshot`, () => {
  const tree = renderer
    .create(<MoviesList
      moviesList={moviesList}
      activeCard={null}
      onCardClick={() => {}}
      onMouseOverCard={() => {}}
      onMouseOutOfCard={() => {}}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
