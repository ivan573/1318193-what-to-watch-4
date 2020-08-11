import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";

import {Router} from "react-router-dom";
import history from "../../history.js";

const movie = {
  title: `Gangs of new york`,
  id: 1,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  background: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  color: `#A6B7AC`
};

test(`Add review page matches snapshot`, () => {
  const tree = renderer
    .create(<Router
      history={history}
    >
      <AddReview
        activeItem={5}
        changeActiveItem={() => {}}
        onSubmitClick={() => {}}
        movie={movie}
        restoreMovies={() => {}}
      />
    </Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
