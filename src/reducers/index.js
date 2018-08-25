import { NEXT_PAGE } from "../actions";

export function page(state = 1, action) {
  switch (action.type) {
    case NEXT_PAGE:
      return state + 1;
    default:
      return state;
  }
}
