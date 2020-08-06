import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

import Main from "../main/main.jsx";
import MovieInfoComponent from "../movie-info/movie-info.jsx";
import Player from "../video-player/video-player.jsx";

import withVideo from "../../hocs/with-video/with-video.js";
import withMovieInfo from "../../hocs/with-movie-info/with-movie-info.js";

const VideoPlayer = withVideo(Player);
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
    const {playingMovie,
      headerMovie,
      activeMovie,
      moviesList,
      shownMovies,
      uniqueGenres,
      areAllMoviesShown,
      onMovieCardClick,
      onGenreClick,
      onShowMoreClick,
      onPlayMovieClick} = this.props;

    const mainElement = activeMovie
      ? <MovieInfo
        movie={activeMovie}
        moviesList={moviesList}
        onCardClick={onMovieCardClick}
        onPlayMovieClick={onPlayMovieClick}
      />
      : <Main
        headerMovie={headerMovie}
        moviesList={shownMovies}
        uniqueGenres={uniqueGenres}
        areAllMoviesShown={areAllMoviesShown}
        onCardClick={onMovieCardClick}
        onGenreClick={onGenreClick}
        onShowMoreClick={() => onShowMoreClick(moviesList)}
        onPlayMovieClick={onPlayMovieClick}
      />;

    return playingMovie ?
      <VideoPlayer
        src={playingMovie.video}
        title={playingMovie.title}
        poster={playingMovie.image}
        isMuted={false}
        isPreviewMode={false}
        // the played movie in the store sets to null thus the app receives to the state before the movie started playing
        onExitClick={() => onPlayMovieClick(null)}
      /> : mainElement;
  }
}

App.propTypes = {
  playingMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }),
  headerMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }),
  activeMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }),
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
  shownMovies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired
      }).isRequired
  ),
  uniqueGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
  areAllMoviesShown: PropTypes.bool.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  playingMovie: state.playingMovie,
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
  },
  onPlayMovieClick(movie) {
    dispatch(ActionCreator.changePlayingMovie(movie));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
