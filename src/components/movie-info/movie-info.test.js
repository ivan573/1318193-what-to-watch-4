import React from "react";
import renderer from "react-test-renderer";
import MovieInfo from "./movie-info.jsx";

test(`MovieInfo matches snapshot`, () => {
  const tree = renderer
    .create(<MovieInfo
      movie={
        {
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
      moviesList={[]}
      onCardClick={() => {}}
      activeTab={`OVERVIEW`}
      onTabClick={() => {}}
      onPlayMovieClick={() => {}}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
