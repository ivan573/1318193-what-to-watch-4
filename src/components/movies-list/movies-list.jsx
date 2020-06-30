import React from "react";
import PropTypes from "prop-types";

import MovieCard from "../movie-card/movie-card.jsx";

import {createKey} from "../../utils.js";

const MoviesList = (props) => {
  const {moviesList, onCardHover} = props;

  const movieCards = moviesList.map((it) => {
    return (
      <MovieCard
        key={createKey(it.title)}
        movieName={it.title}
        onCardHover={onCardHover}
      />);
  });

  return (
    <div className="catalog__movies-list">
      {movieCards}
    </div>
  );
};

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
      }).isRequired
  ).isRequired,
  onCardHover: PropTypes.func.isRequired
};

export {MoviesList as default};
