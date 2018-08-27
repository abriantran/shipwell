import fetch from "cross-fetch";

export const NEXT_PAGE = "NEXT_PAGE";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const REQUEST_USER = "REQUEST_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const VALIDATE_ADDRESS_REQUEST = "VALIDATE_ADDRESS_REQUEST";
export const VALIDATE_ADDRESS_SUCCESS = "VALIDATE_ADDRESS_SUCCESS";
export const VALIDATE_ADDRESS_FAILURE = "VALIDATE_ADDRESS_FAILURE";

export function nextPage() {
  return { type: NEXT_PAGE };
}

export function updateAddress(name, value) {
  return { type: UPDATE_ADDRESS, name: name, value: value };
}

export function requestUser() {
  return { type: REQUEST_USER };
}

export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user: user
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
      .then(json => dispatch(receiveUser(json.user)));
  };
}

export function validateAddressRequest(name) {
  return { type: VALIDATE_ADDRESS_REQUEST, name: name };
}

export function validateAddressSuccess(name, response) {
  return { type: VALIDATE_ADDRESS_SUCCESS, name: name, response: response };
}

export function validateAddressFailure(name, error) {
  return { type: VALIDATE_ADDRESS_FAILURE, name: name, error: error };
}

export function validateAddress(name) {
  return function(dispatch, getState) {
    dispatch(validateAddressRequest(name));
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
      .then(response =>
        response
          .json()
          .then(json => (response.ok ? json : Promise.reject(json)))
      )
      .then(
        response => dispatch(validateAddressSuccess(name, response)),
        error => dispatch(validateAddressFailure(name, error))
      );
  };
}
