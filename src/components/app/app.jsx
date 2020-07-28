import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

import Main from "../main/main.jsx";
import MovieInfo from "../movie-info/movie-info.jsx";

const PLAY_DELAY = 1000;

const titleClickHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: null,
      // activeGenre: `All genres`
    };

    this._movieCardClickHandler = this._movieCardClickHandler.bind(this);
    // this._genreClickHander = this._genreClickHander.bind(this);
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
    const {headerMovie, moviesList, uniqueGenres, genre, onGenreClick} = this.props;
    const {activeMovie/* , activeGenre*/} = this.state;

    return activeMovie
      ? <MovieInfo
        movie={this.state.activeMovie}
        moviesList={moviesList}
        onCardClick={this._movieCardClickHandler}
      />
      : <Main
        headerMovie={headerMovie}
        moviesList={moviesList}
        uniqueGenres={uniqueGenres}
        activeGenre={genre}
        onTitleClick={titleClickHandler}
        onCardClick={this._movieCardClickHandler}
        onGenreClick={onGenreClick}
      />;
  }

  _movieCardClickHandler(movie) {
    setTimeout(() => this.setState({activeMovie: movie}), PLAY_DELAY);
  }

  // _genreClickHander(evt, genre) {
  //   evt.preventDefault();
  //   this.setState({activeGenre: genre});
  // }
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
  uniqueGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
  genre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  // activeMovie: state.activeMovie,
  moviesList: state.moviesList,
  genre: state.genre
});

const mapDispatchToProps = (dispatch) => ({
  // onCardClick(movie) {
  //   dispatch(ActionCreator.incrementStep());
  // },
  onGenreClick(evt, genre) {
    evt.preventDefault();
    dispatch(ActionCreator.changeFilter(genre));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
