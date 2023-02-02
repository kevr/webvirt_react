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
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import { createStore } from "../store";
import { setSession } from "../store/Actions";
import { appRoutes } from "../Routing";

global.fetch = jest.fn();
global.queryClient = new QueryClient();

beforeEach(() => {
  fetch.mockClear();
  global.queryClient = new QueryClient();
});

test("Dashboard gracefully fails", async () => {
  const router = createMemoryRouter(appRoutes, {
    initialEntries: ["/"],
  });

  const store = createStore();
  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  fetch.mockReturnValue(
    Promise.resolve({
      status: 401,
      json: () =>
        Promise.resolve({
          detail: "Unrecognized user/password combination",
        }),
    })
  );

  await act(async () =>
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </QueryClientProvider>
      </Provider>
    )
  );

  // A graceful 401 failure leads to a navigation to /login.
  expect(router.state.location.pathname).toBe("/login");
});
