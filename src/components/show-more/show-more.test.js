import React from "react";
import renderer from "react-test-renderer";
import ShowMore from "./show-more.jsx";

describe(`Show more button matches snapshot`, () => {
  it(`Show more button renders if not all movies are displayed`, () => {
    const tree = renderer
    .create(<ShowMore
      areAllMoviesShown={false}
      onShowMoreClick={() => {}}
    />).toJSON;

    expect(tree).toMatchSnapshot();
  });

  it(`Show more button does not render if all movies are displayed`, () => {
    const tree = renderer
    .create(<ShowMore
      areAllMoviesShown={true}
      onShowMoreClick={() => {}}
    />).toJSON;

    expect(tree).toMatchSnapshot();
  });

});
