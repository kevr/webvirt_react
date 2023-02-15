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

let queryClient = new QueryClient();

let router;
let store;

beforeEach(() => {
  queryClient = new QueryClient();

  router = createMemoryRouter(appRoutes, {
    initialEntries: ["/"],
  });

  store = createStore();
  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );
});

const renderDashboard = () =>
  act(
    async () =>
      await render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <RouterProvider router={router} />
            </HelmetProvider>
          </QueryClientProvider>
        </Provider>
      )
  );

const mockDomain = (
  name,
  title = undefined,
  id = -1,
  stateId = VIR_DOMAIN_RUNNING,
  stateStr = stateString(VIR_DOMAIN_RUNNING)
) => ({
  id: id,
  name: {
    text: name,
  },
  title: {
    text: title,
  },
  state: {
    attrib: {
      id: stateId,
      string: stateStr,
    },
  },
});

test("Dashboard gracefully fails", async () => {
  fetch.mockReturnValue(
    Promise.resolve({
      status: 401,
      json: () =>
        Promise.resolve({
          detail: "Unrecognized user/password combination",
        }),
    })
  );

  await renderDashboard();

  // A graceful 401 failure leads to a navigation to /login.
  expect(router.state.location.pathname).toBe("/login");
});

test("Dashboard renders nothing", async () => {
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
        json: () => Promise.resolve([]),
      })
    );

  await renderDashboard();

  const message = screen.getByText("No domains found...");
  expect(message).toBeInTheDocument();
});

test("Dashboard renders domains", async () => {
  const domains = [
    mockDomain("test_machine", undefined, 1),
    mockDomain("test_machine2", undefined, 2),
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

  await renderDashboard();

  expect(router.state.location.pathname).toBe("/");
  const domainElements = screen.getAllByTestId("domain");
  expect(domainElements.length).toBe(2);
  const titles = screen.getAllByTestId("domain-title");
  expect(titles[0].textContent).toBe("test_machine");
  expect(titles[1].textContent).toBe("test_machine2");
});

test("Dashboard renders domains with custom titles", async () => {
  const domains = [
    mockDomain("test_machine", "Custom Title", 1),
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

  await renderDashboard();

  expect(router.state.location.pathname).toBe("/");
  const domainElements = screen.getAllByTestId("domain");
  expect(domainElements.length).toBe(2);

  const titles = screen.getAllByTestId("domain-title");
  expect(titles[0].textContent).toBe("Custom Title");
});
