import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore} from "redux";
import {Provider} from "react-redux";

import {moviesList} from "./mocks/movies.js";
import {reducer} from "./reducer.js";
import {getUniqueGenres} from "./utils.js";

const HEADER_MOVIE = moviesList[0]; // {
//   title: `The Grand Budapest Hotel`,
//   genre: `Drama`,
//   year: 2014
// };

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const uniqueGenres = getUniqueGenres(moviesList);

ReactDOM.render(
    <Provider store={store}>
      <App
        headerMovie={HEADER_MOVIE}
        moviesList={moviesList}
        uniqueGenres={uniqueGenres}
      />
    </Provider>,
    document.getElementById(`root`)
);
