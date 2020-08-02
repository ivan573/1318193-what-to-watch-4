import React from "react";
import PropTypes from "prop-types";

import GenresList from "../genres-list/genres-list.jsx";
import Movies, {modes} from "../movies-list/movies-list.jsx";
import ShowMore from "../show-more/show-more.jsx";

import withMoviesList from "../../hocs/with-movies-list/with-movies-list.js";

const MoviesList = withMoviesList(Movies);

const Main = (props) => {
  const {headerMovie, moviesList, uniqueGenres, activeGenre, areAllMoviesShown, onTitleClick, onCardClick, onGenreClick, onShowMoreClick} = props;
  const {title, genre, year} = headerMovie;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2
                className="movie-card__title"
                onClick={onTitleClick}
              >
                {title}
              </h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            genres={uniqueGenres}
            activeGenre={activeGenre}
            onGenreClick={onGenreClick}
          />

          <MoviesList
            moviesList = {moviesList}
            onCardClick = {onCardClick}
            mode={{mode: modes.ALL}}
          />

          <ShowMore
            areAllMoviesShown={areAllMoviesShown}
            onShowMoreClick={onShowMoreClick}
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  headerMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
  }),
  moviesList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired
      })
  ).isRequired,
  uniqueGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeGenre: PropTypes.string.isRequired,
  areAllMoviesShown: PropTypes.bool.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired
};


export {Main as default};
