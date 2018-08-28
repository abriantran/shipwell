import * as reducers from "./reducers";

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

export default function configureStore() {
  return createStore(
    combineReducers(reducers),
    applyMiddleware(thunkMiddleware)
  );
}
