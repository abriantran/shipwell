import { nextPage, updateAddress, fetchUser, validateAddress } from "./";

import * as reducers from "../reducers";

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunkMiddleware)
);

test("Start on page 1", () => {
  expect(store.getState().page).toBe(1);
});

test("Move to page 2", () => {
  store.dispatch(nextPage());
  expect(store.getState().page).toBe(2);
});

test('Initialize "To" and "From" addresses', () => {
  expect(
    store.getState().addresses.find(address => address.name === "To")
  ).toBeDefined();
  expect(
    store.getState().addresses.find(address => address.name === "From")
  ).toBeDefined();
});

test("Update address", () => {
  const name = "To";
  const address = "209 W 9th St, Austin, Texas 78701";
  store.dispatch(updateAddress(name, address));
  expect(
    store.getState().addresses.find(address => address.name === name).value
  ).toBe(address);
});

test("Fetch user", () => {
  store
    .dispatch(fetchUser())
    .then(() => expect(store.getState().user).toBeDefined());
});

test("Detect valid address", () => {
  const name = "To";
  const validAddress = "209 W 9th St, Austin, TX 78701, US";

  store.dispatch(updateAddress(name, validAddress));
  store
    .dispatch(validateAddress(name))
    .then(() =>
      expect(
        store.getState().addresses.find(address => address.name === name)
          .isValid.value
      ).toBe(true)
    );
});

test("Detect invalid address", () => {
  const name = "From";
  const invalidAddress = "209 W 9th St, Austin, Texas 78701";

  store.dispatch(updateAddress(name, invalidAddress));
  store
    .dispatch(validateAddress(name))
    .then(() =>
      expect(
        store.getState().addresses.find(address => address.name === name)
          .isValid.value
      ).toBe(false)
    );
});
