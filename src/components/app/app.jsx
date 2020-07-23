import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import Main from "../main/main.jsx";
import MovieInfo from "../movie-info/movie-info.jsx";

const PLAY_DELAY = 1000;

const titleClickHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {activeMovie: null};

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
    const {headerMovie, moviesList} = this.props;
    const {activeMovie} = this.state;

    return activeMovie
      ? <MovieInfo movie={this.state.activeMovie} />
      : <Main
        headerMovie={headerMovie}
        moviesList={moviesList}
        onTitleClick={titleClickHandler}
        onCardClick={this._movieCardClickHandler}
      />;
  }

  _movieCardClickHandler(movie) {
    setTimeout(() => this.setState({activeMovie: movie}), PLAY_DELAY);
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
  ).isRequired
};

export {App as default};
