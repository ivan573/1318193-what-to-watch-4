import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

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

test(`Main matches snapshot`, () => {
  const tree = renderer
    .create(<Main
      headerMovie={{
        title: `Gangs of new york`,
        genre: `Crime`,
        year: 2002,
        id: 1,
        image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
        poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
        background: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
        color: `#A6B7AC`,
        description: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
        rating: 8.8,
        scoresCount: 370881,
        director: `Martin Scorsese`,
        actors: [`Pupa`, `Lupa`],
        duration: 167,
        isFavorite: false,
        preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        video: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`
      }}
      moviesList = {moviesList}
      uniqueGenres={[`All genres`, `Kids & Family`, `Drama`]}
      activeGenre={`All genres`}
      areAllMoviesShown={true}
      onCardClick={() => {}}
      onGenreClick={() => {}}
      onShowMoreClick={() => {}}
      onPlayMovieClick={() => {}}
      allMovies={[]}
      authorizationStatus={`AUTH`}
      onAddToFavoritesClick={() => {}}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
