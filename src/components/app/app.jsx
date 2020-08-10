import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/movies/movies.js";

import {getPlayingMovie, getActiveMovie, getMoviesList, getShownMovies, getAreAllMoviesShown} from "../../reducer/movies/selectors.js";
import {getAllMovies} from "../../reducer/data/selectors.js";


import Main from "../main/main.jsx";
import MovieInfoComponent from "../movie-info/movie-info.jsx";
import Player from "../video-player/video-player.jsx";

import withVideo from "../../hocs/with-video/with-video.js";
import withMovieInfo from "../../hocs/with-movie-info/with-movie-info.js";

import SignIn from "../sign-in/sign-in.jsx";

// import AddReviewComponent from "../add-review/add-review.jsx";
// import withActiveItem from "../../hocs/with-active-item/with-active-item.js";

import {getUniqueGenres} from "../../utils.js";

import {Operation as UserOperation/* , AuthorizationStatus*/} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";

import {Operation as DataOperation} from "../../reducer/data/data.js";

import history from "../../history.js";
import {AppRoute} from "../../const.js";

// temporary solution
const mockHeaderMovie = {
  title: `Gangs of new york`,
  genre: `Crime`,
  year: 2002,
  id: 1,
  image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  background: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  color: `#A6B7AC`,
  description: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
  rating: 8.8,
  scoresCount: 370881,
  director: `Martin Scorsese`,
  duration: 167,
  isFavorite: false,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  video: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`
};

const VideoPlayer = withVideo(Player);
const MovieInfo = withMovieInfo(MovieInfoComponent);

// const AddReview = withActiveItem(AddReviewComponent);

class App extends PureComponent {

  render() {
    const {
      login
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderApp()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <SignIn
              onSubmit={login}
            />
          </Route>
        </Switch>
      </Router>
    );
  }

  _renderApp() {
    const {
      playingMovie,
      activeMovie,
      allMovies,
      moviesList,
      shownMovies,
      areAllMoviesShown,
      onMovieCardClick,
      onGenreClick,
      onShowMoreClick,
      onPlayMovieClick,
      authorizationStatus,
      // login,
      onAddToFavoritesClick,
      // onSubmitClick
    } = this.props;

    // if (authorizationStatus !== AuthorizationStatus.AUTH) {
    //   return <SignIn
    //     onSubmit={login}
    //   />;
    // }

    const mainElement = activeMovie
      ? <MovieInfo
        movie={activeMovie}
        moviesList={moviesList}
        onCardClick={onMovieCardClick}
        onPlayMovieClick={onPlayMovieClick}
        allMovies={allMovies}
        authorizationStatus={authorizationStatus}
        onAddToFavoritesClick={onAddToFavoritesClick}
      />
      : <Main
        headerMovie={mockHeaderMovie}
        moviesList={shownMovies}
        uniqueGenres={getUniqueGenres(allMovies)}
        areAllMoviesShown={areAllMoviesShown}
        onCardClick={onMovieCardClick}
        onGenreClick={onGenreClick}
        onShowMoreClick={() => onShowMoreClick(moviesList)}
        onPlayMovieClick={onPlayMovieClick}
        allMovies={allMovies}
        authorizationStatus={authorizationStatus}
        onAddToFavoritesClick={onAddToFavoritesClick}
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
    preview: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired
  }),
  activeMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }),
  allMovies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired
      }).isRequired
  ).isRequired,
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
  areAllMoviesShown: PropTypes.bool.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
  onAddToFavoritesClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  allMovies: getAllMovies(state),
  playingMovie: getPlayingMovie(state),
  activeMovie: getActiveMovie(state),
  moviesList: getMoviesList(state),
  shownMovies: getShownMovies(state),
  areAllMoviesShown: getAreAllMoviesShown(state),
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick(movie, allMovies) {
    dispatch(ActionCreator.changeActiveMovie(movie, allMovies));
  },
  onGenreClick(evt, genre, allMovies) {
    evt.preventDefault();
    dispatch(ActionCreator.changeFilter(genre, allMovies));
  },
  onShowMoreClick(movies) {
    dispatch(ActionCreator.showMore(movies));
  },
  onPlayMovieClick(movie) {
    dispatch(ActionCreator.changePlayingMovie(movie));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onSubmitClick(id, rating, text) {
    dispatch(DataOperation.postReview(id, rating, text));
  },
  onAddToFavoritesClick(id, status) {
    dispatch(DataOperation.addToFavorites(id, status));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
