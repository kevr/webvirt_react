import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./Reducers";

export const createStore = () => {
  // Deduce initial states for each reducer
  const localSession = localStorage.getItem("session");
  const session = localSession ? JSON.parse(localSession) : {};

  // Initial store state derived from localStorage
  const initialState = { session };

  return configureStore({
    reducer: {
      session: sessionReducer,
    },
    preloadedState: initialState,
  });
};
