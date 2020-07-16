import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MovieCard from "../movie-card/movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null
    };

    this._onMouseOverCard = this._onMouseOverCard.bind(this);
    this._onMouseOutOfCard = this._onMouseOutOfCard.bind(this);
  }

  render() {
    const {moviesList, onCardClick} = this.props;

    const movieCards = moviesList.map((it) => {
      return (
        <MovieCard
          key={it.id}
          movie={it}
          isActive={it === this.state.activeCard}
          onMouseOverCard={this._onMouseOverCard}
          onMouseOutOfCard={this._onMouseOutOfCard}
          onCardClick={onCardClick}
        />);
    });

    return (
      <div className="catalog__movies-list">
        {movieCards}
      </div>
    );
  }

  _onMouseOverCard(movie) {
    this.setState({
      activeCard: movie
    });
  }

  _onMouseOutOfCard() {
    this.setState({
      activeCard: null
    });
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
  onCardClick: PropTypes.func.isRequired
};

export {MoviesList as default};
