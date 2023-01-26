import { SET_SESSION } from "./Actions";

export const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SESSION:
      return Object.assign({}, state, action.session);
    default:
      return state;
  }
};
