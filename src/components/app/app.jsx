import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const App = (props) => {
  const {headerMovie, moviesList} = props;

  return (
    <Main
      headerMovie = {headerMovie}
      moviesList = {moviesList}
    />
  );
};

App.propTypes = {
  headerMovie: PropTypes.objectOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })
  ).isRequired,
  moviesList: PropTypes.arrayOf(
      PropTypes.string
  ).isRequired
};

export {App as default};
