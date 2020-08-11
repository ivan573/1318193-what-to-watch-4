import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

import {Router} from "react-router-dom";
import history from "../../history.js";

test(`Sign in matches snapshot`, () => {
  const tree = renderer
    .create(<Router
      history={history}
    >
      <SignIn
        onSubmit={() => {}}
        restoreMovies={() => {}}
      />
    </Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
