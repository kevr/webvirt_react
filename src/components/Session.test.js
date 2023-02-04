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
import { QueryClientProvider } from "react-query";
import { createStore } from "../store";
import { setSession } from "../store/Actions";
import Session from "./Session";

test("Session can perform logout", async () => {
  const store = createStore();

  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  await act(async () =>
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Session />
        </QueryClientProvider>
      </Provider>
    )
  );

  const submitButton = screen.getByTestId("logout-submit");
  expect(submitButton).toBeInTheDocument();

  await act(() => fireEvent.click(submitButton));

  const session = store.getState().session;
  expect(session).toStrictEqual({});
});
