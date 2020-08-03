import React from "react";
import PropTypes from "prop-types";

import {ALL_GENRES} from "../../const";

const GenresList = (props) => {
  const {genres, activeItem = ALL_GENRES, onGenreClick, changeActiveItem} = props;

  const activeGenre = activeItem || ALL_GENRES;

  const genresList = genres.map((genre) => {
    return (
      <li className={activeGenre === genre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
        onClick={(evt) => {
          onGenreClick(evt, genre);
          changeActiveItem(genre);
        }}
        key={genre}
      >
        <a href="#" className="catalog__genres-link">{genre}</a>
      </li>
    );
  });

  return (
    <ul className="catalog__genres-list">
      {genresList}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeItem: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  changeActiveItem: PropTypes.func.isRequired
};

export {GenresList as default};
