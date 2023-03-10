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
import { act, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../store";
import { setSession } from "../store/Actions";
import SessionRefresher from "./SessionRefresher";

test("SessionRefresher gracefully fails", async () => {
  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 401,
      json: () =>
        Promise.resolve({
          detail: "Not authorized!",
        }),
    })
  );

  const store = createStore();
  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  await act(
    async () =>
      await render(
        <Provider store={store}>
          <SessionRefresher />
        </Provider>
      )
  );

  const session = store.getState().session;
  expect(session).toStrictEqual({});
});
