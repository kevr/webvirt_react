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
import { stateString, VIR_DOMAIN_RUNNING } from "../API";

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

test("Dashboard renders domains", async () => {
  const mockDomain = (
    name,
    id = -1,
    stateId = VIR_DOMAIN_RUNNING,
    stateStr = stateString(VIR_DOMAIN_RUNNING)
  ) => ({
    id: id,
    name: name,
    state: {
      id: stateId,
      string: stateStr,
    },
  });
  const domains = [
    mockDomain("test_machine", 1),
    mockDomain("test_machine2", 2),
  ];

  fetch
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            user: "test",
            access: "new_access_token",
            refresh: "new_refresh_token",
          }),
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(domains),
      })
    );

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

  await act(() =>
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

  expect(router.state.location.pathname).toBe("/");
  const domainElements = screen.getAllByTestId("domain");
  expect(domainElements.length).toBe(2);
});
