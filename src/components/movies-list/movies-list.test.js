import React from "react";
import renderer from "react-test-renderer";
import MoviesList, {modes} from "./movies-list.jsx";

test(`MovieCard matches snapshot`, () => {
  const tree = renderer
    .create(<MoviesList
      moviesList={[
        {title: `Fantastic Beasts: The Crimes of Grindelwald`, genre: `Kids & Family`, year: 2016},
        {title: `Bohemian Rhapsody`, genre: `Drama`, year: 2018},
        {title: `Macbeth`, genre: `Drama`, year: 2015},
        {title: `Aviator`, genre: `Drama`, year: 2004}
      ]}
      onCardClick={() => {}}
      mode={{mode: modes.ALL}}
    />).toJSON;

  expect(tree).toMatchSnapshot();
});
