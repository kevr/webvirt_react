import { REMOVE_SESSION, SET_SESSION } from "./Actions";

const defaultState = {};

export const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SESSION:
      return Object.assign({}, state, action.session, { authenticated: true });
    case REMOVE_SESSION:
      return defaultState;
    default:
      return state;
  }
};
