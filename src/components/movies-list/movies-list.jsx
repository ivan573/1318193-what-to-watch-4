import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MovieCard from "../movie-card/movie-card.jsx";

import {createKey} from "../../utils.js";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null
    };

    this._onCardHover = this._onCardHover.bind(this);
  }

  render() {
    const {moviesList} = this.props;

    const movieCards = moviesList.map((it) => {
      return (
        <MovieCard
          key={createKey(it.title)}
          movie={it}
          onCardHover={this._onCardHover}
        />);
    });

    return (
      <div className="catalog__movies-list">
        {movieCards}
      </div>
    );
  }

  _onCardHover(movie) {
    this.setState({
      activeCard: movie
    });
  }
}

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
      }).isRequired
  ).isRequired
};

export {MoviesList as default};
