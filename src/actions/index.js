export const NEXT_PAGE = "NEXT_PAGE";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";

export function nextPage() {
  return { type: NEXT_PAGE };
}

export function updateAddress(name, value) {
  return { type: UPDATE_ADDRESS, name: name, value: value };
}
