import { REMOVE_SESSION, SET_SESSION, SET_VIRT_DOMAINS } from "./Actions";

const defaultSessionState = {};

export const sessionReducer = (state = defaultSessionState, action) => {
  switch (action.type) {
    case SET_SESSION:
      const updatedState = Object.assign({}, state, action.session, {
        authenticated: true,
      });
      localStorage.setItem("session", JSON.stringify(updatedState));
      return updatedState;
    case REMOVE_SESSION:
      localStorage.removeItem("session");
      return defaultSessionState;
    default:
      return state;
  }
};

const defaultVirtState = {};

export const virtReducer = (state = defaultVirtState, action) => {
  switch (action.type) {
    case SET_VIRT_DOMAINS:
      return Object.assign({}, state, { domains: action.domains });
    default:
      return state;
  }
};
