import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Tabs, {tabOptions} from "../tabs/tabs.jsx";
import MoviesList, {modes} from "../movies-list/movies-list.jsx";

class MovieInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {activeTab: tabOptions.OVERVIEW};
  }

  render() {
    const {movie, moviesList, onCardClick} = this.props;
    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="main.html" className="logo__link">
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
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.year}</span>
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
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    <li className={this.state.activeTab === tabOptions.OVERVIEW ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
                      <a href="#" className="movie-nav__link" onClick={(evt) => this._tabClickHandler(evt, tabOptions.OVERVIEW)}>Overview</a>
                    </li>
                    <li className={this.state.activeTab === tabOptions.DETAILS ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
                      <a href="#" className="movie-nav__link" onClick={(evt) => this._tabClickHandler(evt, tabOptions.DETAILS)}>Details</a>
                    </li>
                    <li className={this.state.activeTab === tabOptions.REVIEWS ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
                      <a href="#" className="movie-nav__link " onClick={(evt) => this._tabClickHandler(evt, tabOptions.REVIEWS)}>Reviews</a>
                    </li>
                  </ul>
                </nav>

                <Tabs
                  activeTab={this.state.activeTab}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <MoviesList
              moviesList = {moviesList}
              onCardClick = {onCardClick}
              mode={{
                mode: modes.BY_GENRE,
                title: movie.title,
                genre: movie.genre
              }}
            />
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
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
  }

  _tabClickHandler(evt, tab) {
    evt.preventDefault();
    this.setState({activeTab: tab});
  }
}

MovieInfo.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }).isRequired,
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

export {MovieInfo as default};
