import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {movie, onCardHover, onCardClick} = props;

  const onTitleClick = (event) => {
    event.preventDefault();
    onCardClick(movie);
  };

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver={() => onCardHover(movie)}
      onClick={() => onCardClick(movie)}
    >
      <div className="small-movie-card__image">
        <img src={movie.src} alt={movie.title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onClick={onTitleClick}>{movie.title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired
  }).isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired
};

export {MovieCard as default};
