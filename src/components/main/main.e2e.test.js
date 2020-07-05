import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Title is clicked on`, () => {
  const onTitleClick = jest.fn();

  const main = shallow(
      <Main
        headerMovie = {{
          title: `The Grand Budapest Hotel`,
          genre: `Drama`,
          year: 2014
        }}
        moviesList = {[
          {title: `Fantastic Beasts: The Crimes of Grindelwald`, genre: `Kids & Family`, year: 2016},
          {title: `Bohemian Rhapsody`, genre: `Drama`, year: 2018},
          {title: `Macbeth`, genre: `Drama`, year: 2015},
          {title: `Aviator`, genre: `Drama`, year: 2004}
        ]}
        onTitleClick = {onTitleClick}
      />
  );

  const title = main.find(`.movie-card__title`);

  title.simulate(`click`);

  expect(onTitleClick).toHaveBeenCalledTimes(1);
});
