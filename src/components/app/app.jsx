import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import Main from "../main/main.jsx";
import MovieInfo from "../movie-info/movie-info.jsx";

const titleClickHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {movieToDisplay: null};

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
    const {movieToDisplay} = this.state;

    if (!movieToDisplay) {
      return (
        <Main
          headerMovie = {headerMovie}
          moviesList = {moviesList}
          onTitleClick = {titleClickHandler}
          onCardClick = {this._movieCardClickHandler}
        />
      );
    }

    return (
      <MovieInfo movie = {this.state.movieToDisplay} />
    );
  }

  _movieCardClickHandler(movie) {
    this.setState({movieToDisplay: movie});
  }
}

// const App = (props) => {
//   const {headerMovie, moviesList} = props;

//   return (
//     <Main
//       headerMovie = {headerMovie}
//       moviesList = {moviesList}
//       onTitleClick = {titleClickHandler}
//     />
//   );
// };

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
        src: PropTypes.string.isRequired
      }).isRequired
  ).isRequired
};

export {App as default};
