import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const HEADER_MOVIE = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014
};

const MOVIES_LIST = [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`];

ReactDOM.render(
    <App
      headerMovie = {HEADER_MOVIE}
      moviesList = {MOVIES_LIST}
    />,
    document.getElementById(`root`)
);
