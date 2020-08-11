import React from "react";
import renderer from "react-test-renderer";
import {PrivateRoute} from "./private-route.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

test(`Private route renders without errors`, () => {
  const tree = renderer
    .create(<Router history={history}>
      <PrivateRoute
        authorizationStatus={`NO_AUTH`}
        exact={true}
        path={`/mylist`}
        render={() => {
          return <div></div>;
        }}
      />
    </Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
