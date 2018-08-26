import { NEXT_PAGE, UPDATE_ADDRESS } from "../actions";

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
      isValid: false
    },
    {
      name: "From",
      value: "",
      isValid: false
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
    default:
      return state;
  }
}
