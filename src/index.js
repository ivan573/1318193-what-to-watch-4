import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";

import thunk from "redux-thunk";

import reducer from "./reducer/reducer.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import {createAPI} from "./api.js";

import history from "./history.js";
import {AppRoute} from "./const.js";

const api = createAPI(() => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  history.push(AppRoute.LOGIN);
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.getPromoMovie());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById(`root`)
);
