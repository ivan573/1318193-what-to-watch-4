import React from "react";
import renderer from "react-test-renderer";
import Tabs, {tabOptions} from "./tabs.jsx";

describe(`Tabs match snapshots`, () => {
  it(`Overview tab matches snapshot`, () => {
    const tree = renderer
      .create(<Tabs
        activeTab={tabOptions.OVERVIEW}
      />).toJSON;

    expect(tree).toMatchSnapshot();
  });

  it(`Details tab matches snapshot`, () => {
    const tree = renderer
      .create(<Tabs
        activeTab={tabOptions.DETAILS}
      />).toJSON;

    expect(tree).toMatchSnapshot();
  });

  it(`Reviews tab matches snapshot`, () => {
    const tree = renderer
      .create(<Tabs
        activeTab={tabOptions.REVIEWS}
      />).toJSON;

    expect(tree).toMatchSnapshot();
  });
});
