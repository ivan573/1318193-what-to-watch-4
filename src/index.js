import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

import {moviesList} from "./mocks/movies.js";

const HEADER_MOVIE = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014
};

ReactDOM.render(
    <App
      headerMovie = {HEADER_MOVIE}
      moviesList = {moviesList}
    />,
    document.getElementById(`root`)
);
