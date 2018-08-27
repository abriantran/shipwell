import fetch from "cross-fetch";

export const NEXT_PAGE = "NEXT_PAGE";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const REQUEST_USER = "REQUEST_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const REQUEST_VALIDATION = "REQUEST_VALIDATION";
export const RECEIVE_VALIDATION = "RECEIVE_VALIDATION";

export function nextPage() {
  return { type: NEXT_PAGE };
}

export function updateAddress(name, value) {
  return { type: UPDATE_ADDRESS, name: name, value: value };
}

export function requestUser() {
  return { type: REQUEST_USER };
}

export function receiveUser(json) {
  return {
    type: RECEIVE_USER,
    user: json
  };
}

export function fetchUser() {
  return function(dispatch) {
    dispatch(requestUser());
    return fetch("https://dev-api.shipwell.com/v2/auth/me/", {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 4c4547fe6ad68c57cbac0a8cfbfec35b"
      }
    })
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(json => dispatch(receiveUser(json)));
  };
}

export function requestValidation(name) {
  return { type: REQUEST_VALIDATION, name: name };
}

export function receiveValidation(name, isValid) {
  return { type: RECEIVE_VALIDATION, name: name, isValid: isValid };
}

export function validateAddress(name) {
  return function(dispatch, getState) {
    dispatch(requestValidation(name));
    const address = getState().addresses.find(address => address.name === name);
    return fetch(
      "https://dev-api.shipwell.com/v2/locations/addresses/validate/",
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ formatted_address: address.value })
      }
    )
      .then(response => response.json())
      .then(json =>
        dispatch(receiveValidation(name, json.warnings.length === 0))
      );
  };
}
