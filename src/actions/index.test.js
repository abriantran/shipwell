import { nextPage } from "./";

import * as reducers from "../reducers";

import { createStore, combineReducers } from "redux";

const store = createStore(combineReducers(reducers));

test("Application starts on page 1", () => {
  expect(store.getState().page).toBe(1);
});

test("NEXT_PAGE moves application to page 2", () => {
  store.dispatch(nextPage());
  expect(store.getState().page).toBe(2);
});
