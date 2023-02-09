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
import { createStore } from "../../store";
import TextInput from "./TextInput";

test("TextInput updates", async () => {
  const domain = { name: "test" };

  let refetched = false;
  const refetch = () => {
    refetched = true;
  };

  const store = createStore();
  fetch
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(domain),
      })
    );

  await act(
    async () =>
      await render(
        <Provider store={store}>
          <TextInput
            data-testid="input"
            domain={domain}
            domainEndpoint="metadata"
            name="test"
            value="initial_value"
            refetch={refetch}
          />
        </Provider>
      )
  );

  const input = screen.getByTestId("input");
  expect(input).toBeInTheDocument();

  await act(async () => {
    await fireEvent.input(input, { target: { value: "test" } });
    await fireEvent.blur(input);
  });

  expect(refetched).toBe(true);
});

test("TextInput update fails", async () => {
  const domain = { name: "test" };

  let refetched = false;
  const refetch = () => {
    refetched = true;
  };

  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve({ detail: "Invalid JSON" }),
    })
  );

  const store = createStore();
  await act(
    async () =>
      await render(
        <Provider store={store}>
          <TextInput
            data-testid="input"
            domain={domain}
            domainEndpoint="metadata"
            name="test"
            value="initial_value"
            refetch={refetch}
          />
        </Provider>
      )
  );

  const input = screen.getByTestId("input");
  expect(input).toBeInTheDocument();

  await act(async () => {
    await fireEvent.input(input, { target: { value: "test" } });
    await fireEvent.blur(input);
  });

  expect(refetched).toBe(false);

  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
});
