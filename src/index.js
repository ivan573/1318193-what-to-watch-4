import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const HEADER_MOVIE = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014
};

ReactDOM.render(
    <App
      headerMovie={HEADER_MOVIE}
    />,
    document.getElementById(`root`)
);
