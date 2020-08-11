import React from "react";
import renderer from "react-test-renderer";
import MyList from "./my-list.jsx";

import {Router} from "react-router-dom";
import history from "../../history.js";

const moviesList = [
  {title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `Kids & Family`,
    year: 2016,
    id: 1,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`},
  {title: `Bohemian Rhapsody`,
    genre: `Drama`,
    year: 2018,
    id: 2,
    image: `img/bohemian-rhapsody.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`},
  {title: `Macbeth`,
    genre: `Drama`,
    year: 2015,
    id: 3,
    image: `img/macbeth.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`},
  {title: `Aviator`,
    genre: `Drama`,
    year: 2004,
    id: 4,
    image: `img/aviator.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}
];

test(`My list matches snapshot`, () => {
  const tree = renderer
    .create(<Router
      history={history}
    >
      <MyList
        moviesList={moviesList}
        onCardClick={() => {}}
        allMovies={moviesList}
        restoreMovies={() => {}}
        movies={moviesList}
      />
    </Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
