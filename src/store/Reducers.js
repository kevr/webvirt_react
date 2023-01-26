import { REMOVE_SESSION, SET_SESSION } from "./Actions";

const defaultState = {};

export const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SESSION:
      const updatedState = Object.assign({}, state, action.session, {
        authenticated: true,
      });
      localStorage.setItem("session", updatedState);
    case REMOVE_SESSION:
      localStorage.removeItem("session");
      return defaultState;
    default:
      return state;
  }
};
