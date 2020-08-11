import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import PrivateRoute from "../private-route/private-route.jsx";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/movies/movies.js";

import {getPlayingMovie, getActiveMovie, getMoviesList, getShownMovies, getAreAllMoviesShown} from "../../reducer/movies/selectors.js";
import {getAllMovies, getFavoriteMovies, getPromoMovie, getReviews} from "../../reducer/data/selectors.js";


import Main from "../main/main.jsx";
import MovieInfoComponent from "../movie-info/movie-info.jsx";
import Player from "../video-player/video-player.jsx";

import withVideo from "../../hocs/with-video/with-video.js";
import withMovieInfo from "../../hocs/with-movie-info/with-movie-info.js";

import SignIn from "../sign-in/sign-in.jsx";

import AddReviewComponent from "../add-review/add-review.jsx";
import MyListComponent from "../my-list/my-list.jsx";

import withActiveItem from "../../hocs/with-active-item/with-active-item.js";

import {getUniqueGenres, getMovieById, getMovieReviews} from "../../utils.js";

import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";

import {Operation as DataOperation} from "../../reducer/data/data.js";

import history from "../../history.js";
import {AppRoute} from "../../const.js";

const VideoPlayer = withVideo(Player);
const MovieInfo = withMovieInfo(MovieInfoComponent);

const AddReview = withActiveItem(AddReviewComponent);

const MyList = withActiveItem(MyListComponent);

class App extends PureComponent {

  render() {
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
      login,
      onAddToFavoritesClick,
      onSubmitClick,
      favoriteMovies,
      promoMovie,
      reviews,
      getReviews
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.LOGIN}
            render={() =>
              <SignIn
                onSubmit={login}
              />}/>
          <Route exact path={AppRoute.ROOT} render={() => this._renderApp()}/>
          <Route exact path={AppRoute.MOVIE_INFO} render={(props) => {
            return <MovieInfo
              movie={getMovieById(props.match.params.id, allMovies)}
              moviesList={moviesList}
              onCardClick={onMovieCardClick}
              onPlayMovieClick={onPlayMovieClick}
              allMovies={allMovies}
              authorizationStatus={authorizationStatus}
              onAddToFavoritesClick={onAddToFavoritesClick}
              reviews={getMovieReviews(props.match.params.id, reviews, getReviews)} //getReviews(props.match.params.id)}
            />;
          }}>
          </Route>
          <Route exact path={AppRoute.ADD_REVIEW} render={(props) => {
            return <AddReview
              onSubmitClick={onSubmitClick}
              movie={getMovieById(props.match.params.id, allMovies)}
            />;
          }}>
          </Route>
          <Route exact path={AppRoute.VIDEO_PLAYER}>
            <VideoPlayer
              movie={playingMovie}
              isMuted={false}
              isPreviewMode={false}
              // the played movie in the store sets to null thus the app receives to the state before the movie started playing
              onExitClick={() => onPlayMovieClick(null)}
            />
          </Route>
          <PrivateRoute exact path={AppRoute.MY_LIST}
            render={() => {
              return (
                <MyList
                  movies={favoriteMovies}
                  allMovies={allMovies}
                  onCardClick={onMovieCardClick}
                />
              );
            }}
          />
        </Switch>
      </ Router>
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
      onAddToFavoritesClick,
      promoMovie
    } = this.props;

    // if (authorizationStatus !== AuthorizationStatus.AUTH) {
    //   return history.push((AppRoute.LOGIN));
    // }

    // if (playingMovie) {
    //   return history.push(AppRoute.getVideoPlayer(playingMovie.id));
    // }

    // if (activeMovie) {
    //   return history.push(AppRoute.getMovieInfo(activeMovie.id));
    // }

    return <Main
      headerMovie={promoMovie}
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
  }

  _onAvatarClick() {
    history.push();
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
  onAddToFavoritesClick: PropTypes.func.isRequired,
  favoriteMovies: PropTypes.array,
  promoMovie: PropTypes.object.isRequired,
  getReviews: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  allMovies: getAllMovies(state),
  playingMovie: getPlayingMovie(state),
  activeMovie: getActiveMovie(state),
  moviesList: getMoviesList(state),
  shownMovies: getShownMovies(state),
  areAllMoviesShown: getAreAllMoviesShown(state),
  authorizationStatus: getAuthorizationStatus(state),
  favoriteMovies: getFavoriteMovies(state),
  promoMovie: getPromoMovie(state),
  reviews: getReviews(state)
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
  },
  getReviews(id) {
    dispatch(DataOperation.getReviews(id));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
