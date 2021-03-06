import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import GenresComponent from "../genres-list/genres-list.jsx";
import MoviesComponent from "../movies-list/movies-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";
import {IsFavoriteStatus} from "../../reducer/data/data.js";

const MoviesList = withActiveItem(withMoviesList(MoviesComponent));
const GenresList = withActiveItem(GenresComponent);

const Main = (props) => {
  const {
    headerMovie,
    moviesList,
    uniqueGenres,
    areAllMoviesShown,
    onCardClick,
    onGenreClick,
    onShowMoreClick,
    onPlayMovieClick,
    allMovies,
    authorizationStatus,
    onAddToFavoritesClick
  } = props;
  const {title, genre, year, id, poster, background} = headerMovie;

  const statusToSet = headerMovie.isFavorite ? IsFavoriteStatus.FALSE : IsFavoriteStatus.TRUE;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={background} alt={title} />
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
            {authorizationStatus === AuthorizationStatus.AUTH ?
              <div className="user-block__avatar">
                <Link to={AppRoute.MY_LIST}>
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </Link>
              </div> :
              <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>}
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={poster} alt={title} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2
                className="movie-card__title"
              >
                {title}
              </h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={() => onPlayMovieClick(headerMovie)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <button className="btn btn--list movie-card__button" type="button" onClick={() => onAddToFavoritesClick(id, statusToSet)}>
                    {headerMovie.isFavorite ?
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg> :
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>}
                    <span>My list</span>
                  </button> : ``}
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
            onGenreClick={onGenreClick}
          />

          <MoviesList
            moviesList = {moviesList}
            onCardClick = {onCardClick}
            allMovies={allMovies}
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
    title: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
    id: PropTypes.number,
    poster: PropTypes.string,
    background: PropTypes.string,
    isFavorite: PropTypes.bool
  }),
  moviesList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired
      })
  ).isRequired,
  uniqueGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
  areAllMoviesShown: PropTypes.bool.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired,
  allMovies: PropTypes.array.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onAddToFavoritesClick: PropTypes.func.isRequired
};

export {Main as default};
