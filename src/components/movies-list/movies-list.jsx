import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MovieCard from "../movie-card/movie-card.jsx";

const modes = {
  ALL: `ALL`,
  BY_GENRE: `BY_GENRE`
};

class MoviesList extends PureComponent {

  render() {
    const {moviesList, activeCard, mode, onCardClick, onMouseOverCard, onMouseOutOfCard} = this.props;

    let movies = moviesList.slice();

    if (mode.mode === modes.BY_GENRE) {
      movies = movies.filter((movie) => movie.genre === mode.genre && movie.title !== mode.title);
    }

    const movieCards = movies.map((it) => {
      return (
        <MovieCard
          key={it.id}
          movie={it}
          isActive={it === activeCard}
          onMouseOverCard={onMouseOverCard}
          onMouseOutOfCard={onMouseOutOfCard}
          onCardClick={onCardClick}
        />);
    });

    return (
      <div className="catalog__movies-list">
        {movieCards}
      </div>
    );
  }
}

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired
      }).isRequired
  ).isRequired,
  activeCard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }),
  mode: PropTypes.shape({
    mode: PropTypes.string.isRequired,
    title: PropTypes.string,
    genre: PropTypes.string
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onMouseOverCard: PropTypes.func.isRequired,
  onMouseOutOfCard: PropTypes.func.isRequired
};

export {MoviesList as default, modes};
