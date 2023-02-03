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
import { createStore } from "../store";
import StateControl from "./StateControl";
import { setSession, setVirtDomain } from "../store/Actions";
import { VIR_DOMAIN_SHUTOFF, stateString, VIR_DOMAIN_RUNNING } from "../API";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test("StateControl starts via webvirtd", async () => {
  const store = createStore();

  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  const domain = {
    id: -1,
    name: "test_machine",
    state: {
      id: VIR_DOMAIN_SHUTOFF,
      string: stateString(VIR_DOMAIN_SHUTOFF),
    },
  };

  await act(() =>
    render(
      <Provider store={store}>
        <StateControl domain={domain} />
      </Provider>
    )
  );

  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 201,
      json: () =>
        Promise.resolve({
          id: -1,
          name: "test_machine",
          state: {
            id: VIR_DOMAIN_RUNNING,
            string: stateString(VIR_DOMAIN_RUNNING),
          },
        }),
    })
  );

  const startButton = screen.getByTestId("start-submit");
  await act(() => fireEvent.click(startButton));
  expect(fetch).toHaveBeenCalledTimes(1);
});

test("StateControl start gracefully fails", async () => {
  const store = createStore();

  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  const domain = {
    id: -1,
    name: "test_machine",
    state: {
      id: VIR_DOMAIN_SHUTOFF,
      string: stateString(VIR_DOMAIN_SHUTOFF),
    },
  };

  await act(() =>
    render(
      <Provider store={store}>
        <StateControl domain={domain} />
      </Provider>
    )
  );

  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 502,
      json: () =>
        Promise.resolve({
          detail: "Timed out",
        }),
    })
  );

  const startButton = screen.getByTestId("start-submit");
  await act(() => fireEvent.click(startButton));
  expect(fetch).toHaveBeenCalledTimes(1);
});

test("StateControl shuts down via webvirtd", async () => {
  const store = createStore();

  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  const domain = {
    id: -1,
    name: "test_machine",
    state: {
      id: VIR_DOMAIN_RUNNING,
      string: stateString(VIR_DOMAIN_RUNNING),
    },
  };

  await act(() =>
    render(
      <Provider store={store}>
        <StateControl domain={domain} />
      </Provider>
    )
  );

  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          id: -1,
          name: "test_machine",
          state: {
            id: VIR_DOMAIN_SHUTOFF,
            string: stateString(VIR_DOMAIN_SHUTOFF),
          },
        }),
    })
  );

  const shutdownButton = screen.getByTestId("shutdown-submit");
  await act(() => fireEvent.click(shutdownButton));
  expect(fetch).toHaveBeenCalledTimes(1);
});

test("StateControl shutdown gracefully fails", async () => {
  const store = createStore();

  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  const domain = {
    id: -1,
    name: "test_machine",
    state: {
      id: VIR_DOMAIN_RUNNING,
      string: stateString(VIR_DOMAIN_RUNNING),
    },
  };

  await act(() =>
    render(
      <Provider store={store}>
        <StateControl domain={domain} />
      </Provider>
    )
  );

  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 500,
      json: () =>
        Promise.resolve({
          detail: "Crazy error",
        }),
    })
  );

  const shutdownButton = screen.getByTestId("shutdown-submit");
  await act(() => fireEvent.click(shutdownButton));
  expect(fetch).toHaveBeenCalledTimes(1);
});
