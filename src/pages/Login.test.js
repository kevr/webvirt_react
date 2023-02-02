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
import {
  RouterProvider,
  MemoryRouter,
  createMemoryRouter,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { createStore } from "../store";
import Login from "./Login";
import { appRoutes } from "../Routing";

global.fetch = jest.fn();
global.queryClient = new QueryClient();

beforeEach(() => {
  fetch.mockClear();
  global.queryClient = new QueryClient();
});

test("Login page renders", async () => {
  const store = createStore();
  await act(async () =>
    render(
      <Provider store={store}>
        <HelmetProvider>
          <MemoryRouter initialEntries={["/login?next=%2F"]}>
            <Login />
          </MemoryRouter>
        </HelmetProvider>
      </Provider>
    )
  );

  const form = screen.getByTestId("login-form");
  expect(form).toBeInTheDocument();
});

test("Login page navigates to / on login", async () => {
  const router = createMemoryRouter(appRoutes, {
    initialEntries: ["/login?next=%2F"],
  });

  const store = createStore();
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

  const good = [
    {
      id: 1,
      name: "test_machine",
      state: {
        id: 1,
        string: "Running",
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
        json: () => good,
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => good,
      })
    );

  const userInput = screen.getByTestId("login-user");
  expect(userInput).toBeInTheDocument();
  const passwordInput = screen.getByTestId("login-password");
  expect(passwordInput).toBeInTheDocument();
  const submitButton = screen.getByTestId("login-submit");
  expect(submitButton).toBeInTheDocument();

  await act(async () => {
    await fireEvent.change(userInput, {
      target: {
        value: "test_user",
      },
    });

    await fireEvent.change(passwordInput, {
      target: {
        value: "test_password",
      },
    });

    await fireEvent.click(submitButton);
  });

  expect(router.state.location.pathname).toBe("/");
});
