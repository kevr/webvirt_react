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
import { QueryClient, QueryClientProvider } from "react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createStore } from "../store";
import { setSession } from "../store/Actions";
import { appRoutes } from "../Routing";
import Host from "./Host";

let queryClient;

let router;
let store;

beforeEach(() => {
  queryClient = new QueryClient();

  router = createMemoryRouter(appRoutes, {
    initialEntries: ["/host"],
  });

  store = createStore();
  store.dispatch(
    setSession({
      user: "root",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          user: "root",
          access: "new_access",
          refresh: "new_refresh",
        }),
    })
  );
});

const renderHook = () =>
  act(
    async () =>
      await render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <RouterProvider router={router}>
                <Host />
              </RouterProvider>
            </HelmetProvider>
          </QueryClientProvider>
        </Provider>
      )
  );

test("Host renders nothing", async () => {
  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve([]),
    })
  );

  await renderHook();
  const error = screen.queryByTestId("error");
  expect(error).not.toBeInTheDocument();

  const message = screen.getByText("No networks found...");
  expect(message).toBeInTheDocument();
});

test("Host renders", async () => {
  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve([
          {
            name: {
              text: "test",
            },
            bridge: {
              attrib: {
                name: "virbr0",
              },
            },
            ip: {
              attrib: {
                address: "192.168.0.1",
                netmask: "255.255.255.0",
              },
              dhcp: {
                range: {
                  attrib: {
                    start: "192.168.0.2",
                    end: "192.168.0.254",
                  },
                },
              },
            },
          },
        ]),
    })
  );

  await renderHook();
  const error = screen.queryByTestId("error");
  expect(error).not.toBeInTheDocument();
});

test("Host handles API errors", async () => {
  fetch.mockReturnValueOnce(Promise.reject({}));

  await renderHook();
  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
});
