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
import { apiRequest, handleFetch, stateString } from "./API";

test("stateString throws with unknown id", () => {
  expect(() => stateString(999)).toThrow();
});

test("apiRequest defaults", async () => {
  let options;
  fetch.mockImplementationOnce((url, opts) => {
    options = opts;
    return Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          key: "my_data",
        }),
    });
  });

  const json = await apiRequest("abc");
  expect(json.key).toBe("my_data");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(options.method).toBe("GET");
  expect(options.body).toBe(undefined);
});

test("handleFetch default error data", async () => {
  let options;
  fetch.mockImplementationOnce((url, opts) => {
    options = opts;
    return Promise.reject({
      status: 500,
    });
  });

  let error;
  await handleFetch(apiRequest("abc")).catch((error_) => {
    error = error_;
  });
  expect(error.data.detail).toBe("Unable to contact API");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(options.method).toBe("GET");
  expect(options.body).toBe(undefined);
});
