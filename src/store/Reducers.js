import {
  REMOVE_APP_TITLE,
  REMOVE_SESSION,
  SET_APP_TITLE,
  SET_SESSION,
  SET_VIRT_DOMAIN,
  SET_VIRT_DOMAINS,
} from "./Actions";

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

const defaultVirtState = { domains: {} };

export const virtReducer = (state = defaultVirtState, action) => {
  switch (action.type) {
    case SET_VIRT_DOMAIN:
      const o = Object.assign({}, state, {
        domains: Object.assign({}, state.domains, {
          [action.domain.name]: Object.assign(
            {},
            state.domains[action.domain.name],
            action.domain
          ),
        }),
      });
      console.log(o);
      return o;
    case SET_VIRT_DOMAINS:
      const domains = JSON.parse(JSON.stringify(action.domains));
      const object = {};
      domains.forEach((domain, index) => {
        object[domain.name] = domain;
      });
      return Object.assign({}, state, { domains: object });
    default:
      return state;
  }
};

const defaultAppState = {
  title: "webvirt",
};

export const appReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case SET_APP_TITLE:
      return Object.assign({}, state, { title: action.title });
    case REMOVE_APP_TITLE:
      return defaultAppState;
    default:
      return state;
  }
};
