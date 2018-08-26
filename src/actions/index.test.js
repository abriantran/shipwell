import { nextPage, updateAddress } from "./";

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

test('"To" and "From" addresses initialized', () => {
  expect(store.getState().addresses).toContainEqual({
    name: "To",
    value: "",
    isValid: false
  });
  expect(store.getState().addresses).toContainEqual({
    name: "From",
    value: "",
    isValid: false
  });
});

test('Update "To" address', () => {
  store.dispatch(updateAddress("To", "209 West 9th St. Austin, Texas 78701"));
  expect(store.getState().addresses).toContainEqual({
    name: "To",
    value: "209 West 9th St. Austin, Texas 78701",
    isValid: false
  });
});
