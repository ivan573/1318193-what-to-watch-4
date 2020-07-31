import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowMore from "./show-more.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Show more button is clicked on`, () => {
  const onShowMoreClick = jest.fn();

  const showMore = shallow(
      <ShowMore
        areAllMoviesShown={false}
        onShowMoreClick={onShowMoreClick}
      />
  );

  const showMoreButton = showMore.find(`button`);

  showMoreButton.simulate(`click`);

  expect(onShowMoreClick).toHaveBeenCalledTimes(1);
});
