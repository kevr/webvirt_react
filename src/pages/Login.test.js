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
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { createStore } from "../store";
import { appRoutes } from "../Routing";
import { VIR_DOMAIN_RUNNING, stateString } from "../API";

let queryClient = new QueryClient();

let router;
let store;

beforeEach(() => {
  queryClient = new QueryClient();

  router = createMemoryRouter(appRoutes, {
    initialEntries: ["/login?next=%2F"],
  });

  store = createStore();
});

const renderLogin = () =>
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

test("Login page renders", async () => {
  await renderLogin();
  const form = screen.getByTestId("login-form");
  expect(form).toBeInTheDocument();
});

test("Login page navigates to / on login", async () => {
  await renderLogin();

  const good = [
    {
      id: 1,
      name: {
        text: "test_machine",
      },
      title: {
        text: "",
      },
      state: {
        attrib: {
          id: VIR_DOMAIN_RUNNING,
          string: stateString(VIR_DOMAIN_RUNNING),
        },
      },
    },
  ];

  fetch
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => ({
          user: "test_user",
          access: "test_access_token",
          refresh: "test_refresh_token",
        }),
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(good),
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(good),
      })
    );

  const userInput = screen.getByTestId("login-user");
  expect(userInput).toBeInTheDocument();
  const passwordInput = screen.getByTestId("login-password");
  expect(passwordInput).toBeInTheDocument();
  const submitButton = screen.getByTestId("login-submit");
  expect(submitButton).toBeInTheDocument();

  await act(
    async () =>
      await fireEvent.change(userInput, {
        target: {
          value: "test_user",
        },
      })
  );

  await act(
    async () =>
      await fireEvent.change(passwordInput, {
        target: {
          value: "test_password",
        },
      })
  );

  await act(async () => await fireEvent.click(submitButton));

  expect(router.state.location.pathname).toBe("/");
});

test("Login gracefully fails", async () => {
  await renderLogin();

  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 401,
      detail: "Invalid username/password",
    })
  );

  const submitButton = screen.getByTestId("login-submit");
  expect(submitButton).toBeInTheDocument();

  await act(async () => await fireEvent.click(submitButton));

  expect(router.state.location.pathname).toBe("/login");
  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
});
