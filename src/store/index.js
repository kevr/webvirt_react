import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./Reducers";

export const createStore = () =>
  configureStore({
    reducer: {
      session: sessionReducer,
    },
  });
