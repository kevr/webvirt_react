/* Copyright 2023 Kevin Morris <kevr@0cost.org */
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { createStore } from "./store";
import { appRouter } from "./Routing";
import "materialize-css/dist/css/materialize.css";
import "react-tooltip/dist/react-tooltip.css";
import "./App.css";

const queryClient = new QueryClient();

const Entry = () => {
  const router = appRouter();
  const store = createStore();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Entry;
