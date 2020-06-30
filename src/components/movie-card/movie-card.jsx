import React from "react";
import PropTypes from "prop-types";

import {createKey} from "../../utils.js";

const MovieCard = (props) => {
  const {movieName, onCardHover} = props;

  return (
    <article className="small-movie-card catalog__movies-card" onMouseOver={onCardHover}>
      <div className="small-movie-card__image">
        <img src={`img/` + createKey(movieName) + `.jpg`} alt={movieName} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{movieName}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movieName: PropTypes.string.isRequired,
  onCardHover: PropTypes.func.isRequired
};

export {MovieCard as default};
