import { configureStore } from "@reduxjs/toolkit";
import { appReducer, sessionReducer, virtReducer } from "./Reducers";

export const createStore = () => {
  // Deduce initial states for each reducer
  const localSession = localStorage.getItem("session");
  const session = localSession ? JSON.parse(localSession) : {};

  // Initial store state derived from localStorage
  const initialState = {
    session: session,
    virt: {},
  };

  return configureStore({
    reducer: {
      app: appReducer,
      session: sessionReducer,
      virt: virtReducer,
    },
    preloadedState: initialState,
  });
};
