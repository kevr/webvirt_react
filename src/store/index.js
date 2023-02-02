/*
 * Copyright 2023 Kevin Morris
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
import { configureStore } from "@reduxjs/toolkit";
import { appReducer, sessionReducer, virtReducer } from "./Reducers";

export const createStore = () => {
  // Deduce initial states for each reducer
  const localSession = localStorage.getItem("session");
  const session = localSession ? JSON.parse(localSession) : {};

  // Initial store state derived from localStorage
  const initialState = {
    session: session,
    virt: { domains: {} },
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
