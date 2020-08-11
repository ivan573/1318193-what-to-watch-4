import React from "react";
import PropTypes from "prop-types";

import MoviesComponent from "../movies-list/movies-list.jsx";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";

import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const MoviesList = withActiveItem(withMoviesList(MoviesComponent));

const MyList = (props) => {
  const {movies, onCardClick, allMovies, restoreMovies} = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.ROOT} className="logo__link" onClick={restoreMovies}>
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar" >
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__movies-list">
          {<MoviesList
            moviesList={movies}
            onCardClick={onCardClick}
            allMovies={allMovies}
          />}
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.ROOT} className="logo__link logo__link--light" onClick={restoreMovies}>
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

MyList.propTypes = {
  movies: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  allMovies: PropTypes.array.isRequired,
  restoreMovies: PropTypes.func.isRequired
};

export {MyList as default};
