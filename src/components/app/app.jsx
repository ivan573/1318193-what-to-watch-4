import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const titleClickHandler = () => {};

const App = (props) => {
  const {headerMovie, moviesList} = props;

  return (
    <Main
      headerMovie = {headerMovie}
      moviesList = {moviesList}
      onTitleClick = {titleClickHandler}
    />
  );
};

App.propTypes = {
  headerMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }),
  moviesList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
      }).isRequired
  ).isRequired
};

export {App as default};
