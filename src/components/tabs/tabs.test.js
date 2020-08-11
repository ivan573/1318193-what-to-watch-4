import React from "react";
import renderer from "react-test-renderer";
import Tabs, {TabOption} from "./tabs.jsx";

const movie = {
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
};

const reviews = [{
  "id": 1,
  "user": {
    "id": 4,
    "name": `Kate Muir`
  },
  "rating": 8.9,
  "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  "date": `2019-05-08T14:13:56.569Z`
}];

describe(`Tabs match snapshots`, () => {
  it(`Overview tab matches snapshot`, () => {
    const tree = renderer
      .create(<Tabs
        activeTab={TabOption.OVERVIEW}
        movie={movie}
        getReviews={() => {
          return reviews;
        }}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Details tab matches snapshot`, () => {
    const tree = renderer
      .create(<Tabs
        activeTab={TabOption.DETAILS}
        movie={movie}
        getReviews={() => {
          return reviews;
        }}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Reviews tab matches snapshot`, () => {
    const tree = renderer
      .create(<Tabs
        activeTab={TabOption.REVIEWS}
        movie={movie}
        getReviews={() => {
          return reviews;
        }}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
