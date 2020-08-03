import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

import Main from "../main/main.jsx";
import MovieInfoComponent from "../movie-info/movie-info.jsx";

import withMovieInfo from "../../hocs/with-movie-info/with-movie-info.js";

const MovieInfo = withMovieInfo(MovieInfoComponent);

class App extends PureComponent {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-component">
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {headerMovie, activeMovie, moviesList, shownMovies, uniqueGenres, areAllMoviesShown, onMovieCardClick, onGenreClick, onShowMoreClick} = this.props;
    // const {activeMovie} = this.state;

    return activeMovie
      ? <MovieInfo
        movie={activeMovie}
        moviesList={moviesList}
        onCardClick={onMovieCardClick}
      />
      : <Main
        headerMovie={headerMovie}
        moviesList={shownMovies}
        uniqueGenres={uniqueGenres}
        areAllMoviesShown={areAllMoviesShown}
        onCardClick={onMovieCardClick}
        onGenreClick={onGenreClick}
        onShowMoreClick={() => onShowMoreClick(moviesList)}
      />;
  }
}

App.propTypes = {
  headerMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }),
  activeMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }),
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
  shownMovies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired
      }).isRequired
  ),
  uniqueGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
  areAllMoviesShown: PropTypes.bool.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeMovie: state.activeMovie,
  moviesList: state.moviesList,
  shownMovies: state.shownMovies,
  areAllMoviesShown: state.areAllMoviesShown
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick(movie) {
    dispatch(ActionCreator.changeActiveMovie(movie));
  },
  onGenreClick(evt, genre) {
    evt.preventDefault();
    dispatch(ActionCreator.changeFilter(genre));
  },
  onShowMoreClick(movies) {
    dispatch(ActionCreator.showMore(movies));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
