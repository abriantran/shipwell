import {
  UPDATE_ADDRESS,
  REQUEST_USER,
  RECEIVE_USER,
  VALIDATE_ADDRESS_REQUEST,
  VALIDATE_ADDRESS_SUCCESS,
  VALIDATE_ADDRESS_FAILURE
} from "../actions";

export function addresses(
  state = [
    {
      name: "To",
      value: "",
      isValid: { isFetching: false }
    },
    {
      name: "From",
      value: "",
      isValid: { isFetching: false }
    }
  ],
  action
) {
  switch (action.type) {
    case UPDATE_ADDRESS:
      return state.map(
        address =>
          address.name === action.name
            ? { ...address, value: action.value }
            : address
      );
    case VALIDATE_ADDRESS_REQUEST:
      return state.map(
        address =>
          address.name === action.name
            ? { ...address, isValid: { isFetching: true } }
            : address
      );
    case VALIDATE_ADDRESS_SUCCESS:
      return state.map(
        address =>
          address.name === action.name
            ? {
                ...address,
                isValid: {
                  isFetching: false,
                  response: action.response
                }
              }
            : address
      );
    case VALIDATE_ADDRESS_FAILURE:
      return state.map(
        address =>
          address.name === action.name
            ? {
                ...address,
                isValid: { isFetching: false, error: action.error }
              }
            : address
      );
    default:
      return state;
  }
}

export function user(state = { isFetching: false }, action) {
  switch (action.type) {
    case REQUEST_USER:
      return { isFetching: true };
    case RECEIVE_USER:
      return { ...action.user, isFetching: false };
    default:
      return state;
  }
}
