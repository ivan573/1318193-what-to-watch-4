import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Tabs, {TabOption} from "../tabs/tabs.jsx";
import MoviesComponent from "../movies-list/movies-list.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {AppRoute} from "../../const.js";
import {IsFavoriteStatus} from "../../reducer/data/data.js";
import avatar from "../../../public/img/avatar.jpg";

const MoviesList = withActiveItem(withMoviesList(MoviesComponent));

class MovieInfo extends PureComponent {

  render() {
    const {
      movie,
      moviesList,
      onCardClick,
      activeTab,
      onTabClick,
      onPlayMovieClick,
      allMovies,
      authorizationStatus,
      onAddToFavoritesClick,
      getReviews,
      restoreMovies
    } = this.props;

    const statusToSet = movie.isFavorite ? IsFavoriteStatus.FALSE : IsFavoriteStatus.TRUE;

    const addReviewButton = <Link to={AppRoute.getAddReview(movie.id)} className="btn movie-card__button">Add review</Link>;

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full" style={{backgroundColor: movie.color}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.background} alt={movie.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <Link to={AppRoute.ROOT} className="logo__link" onClick={restoreMovies}>
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>

              <div className="user-block">
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <div className="user-block__avatar">
                    <Link to={AppRoute.MY_LIST}>
                      <img src={avatar} alt="User avatar" width="63" height="63" />
                    </Link>
                  </div> :
                  <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>}
              </div>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.year}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button" onClick={() => onPlayMovieClick(movie)}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  {authorizationStatus === AuthorizationStatus.AUTH ?
                    <button className="btn btn--list movie-card__button" type="button" onClick={() => onAddToFavoritesClick(movie.id, statusToSet)}>
                      {movie.isFavorite ?
                        <svg viewBox="0 0 18 14" width="18" height="14">
                          <use xlinkHref="#in-list"></use>
                        </svg> :
                        <svg viewBox="0 0 19 20" width="19" height="20">
                          <use xlinkHref="#add"></use>
                        </svg>}
                      <span>My list</span>
                    </button> : ``}
                  {authorizationStatus === AuthorizationStatus.AUTH ? addReviewButton : ``}
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={movie.poster} alt={movie.title} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    <li className={activeTab === TabOption.OVERVIEW ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
                      <a href="#" className="movie-nav__link" onClick={(evt) => onTabClick(evt, TabOption.OVERVIEW)}>Overview</a>
                    </li>
                    <li className={activeTab === TabOption.DETAILS ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
                      <a href="#" className="movie-nav__link" onClick={(evt) => onTabClick(evt, TabOption.DETAILS)}>Details</a>
                    </li>
                    <li className={activeTab === TabOption.REVIEWS ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
                      <a href="#" className="movie-nav__link " onClick={(evt) => onTabClick(evt, TabOption.REVIEWS)}>Reviews</a>
                    </li>
                  </ul>
                </nav>

                <Tabs
                  activeTab={activeTab}
                  movie={movie}
                  getReviews={getReviews}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <MoviesList
              moviesList={moviesList}
              onCardClick={onCardClick}
              allMovies={allMovies}
            />
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
      </React.Fragment>
    );
  }

}

MovieInfo.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired
  }).isRequired,
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
  onCardClick: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired,
  allMovies: PropTypes.array.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onAddToFavoritesClick: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired,
  restoreMovies: PropTypes.func.isRequired
};

export {MovieInfo as default};
