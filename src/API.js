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
const apiPrefix = "http://localhost:8000";

export const apiEndpoint = (endpoint) => `${apiPrefix}/${endpoint}/`;

export const apiRequest = (
  endpoint,
  method = "get",
  session = {},
  data = undefined
) => {
  const endpoint_ = apiEndpoint(endpoint);
  method = method.toUpperCase();

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (session.access) {
    options.headers.Authorization = `Bearer ${session.access}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(endpoint_, options)
    .then(async (response) => {
      const data = await response.json();

      if (response.status !== 200 && response.status !== 201) {
        return Promise.reject({
          status: response.status,
          data: data,
        });
      }

      return Promise.resolve(data);
    })
    .catch((error) => {
      if (error.data) {
        return Promise.reject(error);
      } else {
        return Promise.reject({
          status: 500,
          data: { detail: "Unable to contact API" },
        });
      }
    });
};

export const apiRefresh = (token) => {
  const endpoint = apiEndpoint("auth/refresh");
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: token,
    }),
  }).then((response) => response.json());
};

export const apiLogin = (user, password) => {
  return apiRequest("auth", "post", {}, { user, password });
};
