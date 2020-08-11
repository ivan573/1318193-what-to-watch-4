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

import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";

import {Operation as DataOperation} from "../../reducer/data/data.js";

import history from "../../history.js";
import {ALL_GENRES, AppRoute} from "../../const.js";

const VideoPlayer = withVideo(Player);
const MovieInfo = withMovieInfo(MovieInfoComponent);

const AddReview = withActiveItem(AddReviewComponent);

const MyList = withActiveItem(MyListComponent);

class App extends PureComponent {

  render() {
    const {
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
      getMovieComments
    } = this.props;

    const returnBack = () => {
      if (activeMovie) {
        history.push(AppRoute.getMovieInfo(activeMovie.id));
        return;
      }
      history.push(AppRoute.ROOT);
    };

    const restoreMovies = () => {
      onGenreClick(ALL_GENRES, allMovies);
    };

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.LOGIN} render={() => {
            return <SignIn
              onSubmit={(data) => {
                login(data);
                returnBack();
              }}
              restoreMovies={restoreMovies}
            />;
          }}/>
          <Route exact path={AppRoute.ROOT} render={() => {
            return <Main
              headerMovie={promoMovie}
              moviesList={shownMovies}
              uniqueGenres={getUniqueGenres(allMovies)}
              areAllMoviesShown={areAllMoviesShown}
              onCardClick={onMovieCardClick}
              onGenreClick={(evt, genre) => {
                evt.preventDefault();
                onGenreClick(genre, allMovies);
              }}
              onShowMoreClick={() => onShowMoreClick(moviesList)}
              onPlayMovieClick={onPlayMovieClick}
              allMovies={allMovies}
              authorizationStatus={authorizationStatus}
              onAddToFavoritesClick={onAddToFavoritesClick}
            />;
          }}/>
          <Route exact path={AppRoute.MOVIE_INFO} render={(props) => {
            return <MovieInfo
              movie={getMovieById(props.match.params.id, allMovies)}
              moviesList={shownMovies}
              onCardClick={onMovieCardClick}
              onPlayMovieClick={onPlayMovieClick}
              allMovies={allMovies}
              authorizationStatus={authorizationStatus}
              onAddToFavoritesClick={onAddToFavoritesClick}
              getReviews={(id) => getMovieReviews(id, reviews, getMovieComments)}
              restoreMovies={restoreMovies}
            />;
          }}/>
          <Route exact path={AppRoute.VIDEO_PLAYER} render={(props) => {
            return <VideoPlayer
              movie={getMovieById(props.match.params.id, allMovies)}
              isMuted={false}
              isPreviewMode={false}
              onExitClick={() => {
                onPlayMovieClick(null);
                returnBack();
              }}
            />;
          }}/>
          <PrivateRoute exact path={AppRoute.MY_LIST} render={() => {
            return <MyList
              movies={favoriteMovies}
              allMovies={allMovies}
              onCardClick={onMovieCardClick}
              restoreMovies={restoreMovies}
            />;
          }}/>
          <PrivateRoute exact path={AppRoute.ADD_REVIEW} render={(/* props*/) => {
            return <AddReview
              onSubmitClick={onSubmitClick}
              movie={activeMovie} // getMovieById(props.match.params.id, allMovies)}
              restoreMovies={restoreMovies}
            />;
          }}/>
        </Switch>
      </Router>
    );
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
  reviews: PropTypes.object.isRequired,
  getMovieComments: PropTypes.func.isRequired
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
    history.push(AppRoute.getMovieInfo(movie.id));
  },
  onGenreClick(genre, allMovies) {
    dispatch(ActionCreator.changeFilter(genre, allMovies));
  },
  onShowMoreClick(movies) {
    dispatch(ActionCreator.showMore(movies));
  },
  onPlayMovieClick(movie) {
    dispatch(ActionCreator.changePlayingMovie(movie));
    if (movie) {
      history.push(AppRoute.getVideoPlayer(movie.id));
    }
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onSubmitClick(id, rating, text) {
    dispatch(DataOperation.postReview(id, rating, text));
    history.push(AppRoute.getMovieInfo(id));
  },
  onAddToFavoritesClick(id, status) {
    dispatch(DataOperation.addToFavorites(id, status));
  },
  getMovieComments(id) {
    dispatch(DataOperation.getReviews(id));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
