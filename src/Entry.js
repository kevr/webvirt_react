/* Copyright 2023 Kevin Morris <kevr@0cost.org */
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createStore } from "./store";
import { appRouter } from "./Routing";
import "materialize-css/dist/css/materialize.css";
import "react-tooltip/dist/react-tooltip.css";
import "./App.css";

const Entry = () => {
  const router = appRouter();
  const store = createStore();
  return (
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  );
};

export default Entry;
