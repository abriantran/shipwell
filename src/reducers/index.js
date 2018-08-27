import {
  NEXT_PAGE,
  UPDATE_ADDRESS,
  REQUEST_USER,
  RECEIVE_USER,
  REQUEST_VALIDATION,
  RECEIVE_VALIDATION
} from "../actions";

export function page(state = 1, action) {
  switch (action.type) {
    case NEXT_PAGE:
      return state + 1;
    default:
      return state;
  }
}

export function addresses(
  state = [
    {
      name: "To",
      value: "",
      isValid: { isFetching: false, value: false }
    },
    {
      name: "From",
      value: "",
      isValid: { isFetching: false, value: false }
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
    case REQUEST_VALIDATION:
      return state.map(
        address =>
          address.name === action.name
            ? { ...address, isValid: { ...address.isValid, isFetching: true } }
            : address
      );
    case RECEIVE_VALIDATION:
      return state.map(
        address =>
          address.name === action.name
            ? {
                ...address,
                isValid: {
                  ...address.isValid,
                  isFetching: false,
                  value: action.isValid
                }
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
      return { ...state, isFetching: true };
    case RECEIVE_USER:
      return { ...state, user: action.user, isFetching: false };
    default:
      return state;
  }
}
