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
        moviesList = {[`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`]}
        onTitleClick = {onTitleClick}
      />
  );

  const title = main.find(`.movie-card__title`);

  title.simulate(`click`);

  expect(onTitleClick).toHaveBeenCalledTimes(1);
});
