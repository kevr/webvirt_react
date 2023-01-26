import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./Reducers";

export const createStore = () => {
  const localSession = localStorage.getItem("session") || {};

  const initialState = {
    session: localSession,
  };

  return configureStore(
    {
      reducer: {
        session: sessionReducer,
      },
    },
    initialState
  );
};
