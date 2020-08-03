import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

import Main from "../main/main.jsx";
import Info from "../movie-info/movie-info.jsx";

import withMovieInfo from "../../hocs/with-movie-info/with-movie-info.js";

const MovieInfo = withMovieInfo(Info);

const titleClickHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);

    // я думаю, что это состояние какое-то бессмысленное и его нужно удалить
    // если дальше так и не понадибится, то удалю
    this.state = {
      activeMovie: null
    };

    this._movieCardClickHandler = this._movieCardClickHandler.bind(this);
  }

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
    const {headerMovie, moviesList, shownMovies, uniqueGenres, areAllMoviesShown, onGenreClick, onShowMoreClick} = this.props;
    const {activeMovie} = this.state;

    return activeMovie
      ? <MovieInfo
        movie={this.state.activeMovie}
        moviesList={moviesList}
        onCardClick={this._movieCardClickHandler}
      />
      : <Main
        headerMovie={headerMovie}
        moviesList={shownMovies}
        uniqueGenres={uniqueGenres}
        areAllMoviesShown={areAllMoviesShown}
        onTitleClick={titleClickHandler}
        onCardClick={this._movieCardClickHandler}
        onGenreClick={onGenreClick}
        onShowMoreClick={() => onShowMoreClick(moviesList)}
      />;
  }

  _movieCardClickHandler(movie) {
    this.setState({activeMovie: movie});
  }
}

App.propTypes = {
  headerMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
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
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  moviesList: state.moviesList,
  shownMovies: state.shownMovies,
  areAllMoviesShown: state.areAllMoviesShown
});

const mapDispatchToProps = (dispatch) => ({
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
