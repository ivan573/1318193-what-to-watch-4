import React from "react";
import PropTypes from "prop-types";

const GenresList = (props) => {
  const {genres, activeGenre, onGenreClick} = props;

  const genresList = genres.map((it) => {
    return (
      <li className={activeGenre === it ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
        onClick={(evt) => onGenreClick(evt, it)}
        key={it}
      >
        <a href="#" className="catalog__genres-link">{it}</a>
      </li>
    );
  });

  return (
    <React.Fragment>
      <ul className="catalog__genres-list">
        {genresList}
      </ul>
    </React.Fragment>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired
};

export {GenresList as default};
