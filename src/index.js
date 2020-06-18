import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const HEADER_MOVIE = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014
};

const MOVIES_LIST = [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`];

const data = {
  headerMovie: HEADER_MOVIE,
  moviesList: MOVIES_LIST
};

ReactDOM.render(
    <App
      data = {data}
    />,
    document.getElementById(`root`)
);
