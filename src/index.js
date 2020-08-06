import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";

// import {moviesList} from "./mocks/movies.js";
import {getUniqueGenres} from "./utils.js";

import thunk from "redux-thunk";

import {reducer} from "./reducer.js";
import {Operation, ActionCreator, AuthorizationStatus} from "./reducer.js";
import {createAPI} from "./api.js";

const api = createAPI(() => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

let moviesList;
let headerMovie;
let uniqueGenres;

store.dispatch(Operation.loadMovies()).then(() => {
  moviesList = store.getState().moviesList;
  headerMovie = moviesList[0];
  uniqueGenres = getUniqueGenres(moviesList);

  ReactDOM.render(
      <Provider store={store}>
        <App
          headerMovie={headerMovie}
          moviesList={moviesList}
          uniqueGenres={uniqueGenres}
        />
      </Provider>,
      document.getElementById(`root`)
  );
});

// const moviesList = store.getState().moviesList;

// const HEADER_MOVIE = moviesList[0];

// const uniqueGenres = getUniqueGenres(moviesList);

// ReactDOM.render(
//     <Provider store={store}>
//       <App
//         headerMovie={HEADER_MOVIE}
//         moviesList={moviesList}
//         uniqueGenres={uniqueGenres}
//       />
//     </Provider>,
//     document.getElementById(`root`)
// );
