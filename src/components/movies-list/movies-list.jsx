import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MoviesList extends PureComponent {

  render() {
    const {moviesList, activeCard, onCardClick, onMouseOverCard, onMouseOutOfCard, allMovies} = this.props;

    const movieCards = moviesList.map((it) => {
      return (
        <MovieCard
          key={it.id}
          movie={it}
          isActive={it === activeCard}
          onMouseOverCard={onMouseOverCard}
          onMouseOutOfCard={onMouseOutOfCard}
          onCardClick={onCardClick}
          allMovies={allMovies}
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
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired
      }).isRequired
  ).isRequired,
  activeCard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }),
  onCardClick: PropTypes.func.isRequired,
  onMouseOverCard: PropTypes.func.isRequired,
  onMouseOutOfCard: PropTypes.func.isRequired,
  allMovies: PropTypes.array.isRequired
};

export {MoviesList as default};
