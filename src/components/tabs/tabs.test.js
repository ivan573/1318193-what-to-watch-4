import React from "react";
import renderer from "react-test-renderer";
import Tabs, {TabOption} from "./tabs.jsx";

describe(`Tabs match snapshots`, () => {
  it(`Overview tab matches snapshot`, () => {
    const tree = renderer
      .create(<Tabs
        activeTab={TabOption.OVERVIEW}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Details tab matches snapshot`, () => {
    const tree = renderer
      .create(<Tabs
        activeTab={TabOption.DETAILS}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Reviews tab matches snapshot`, () => {
    const tree = renderer
      .create(<Tabs
        activeTab={TabOption.REVIEWS}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
