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
import config from "./Config";

export const apiEndpoint = (endpoint) => `${config.apiPrefix}/${endpoint}/`;

export const handleFetch = (fn) => {
  return fn
    .then(async (response) => {
      let data;
      try {
        data = await response.json();
      } catch (Exception) {
        data = {};
      }

      // Whitelisted HTTP status codes
      const whiteListed = [200, 201, 304];

      const found = whiteListed.find((value) => value === response.status);
      if (found === undefined) {
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

  return handleFetch(fetch(endpoint_, options));
};

export const apiRefresh = (token) => {
  const endpoint = apiEndpoint("auth/refresh");
  return handleFetch(
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: token,
      }),
    })
  );
};

export const apiLogin = (user, password) => {
  return apiRequest("auth", "post", {}, { user, password });
};

/* Constants */
export const VIR_DOMAIN_NOSTATE = 0;
export const VIR_DOMAIN_RUNNING = 1;
export const VIR_DOMAIN_BLOCKED = 2;
export const VIR_DOMAIN_PAUSED = 3;
export const VIR_DOMAIN_SHUTDOWN = 4;
export const VIR_DOMAIN_SHUTOFF = 5;
export const VIR_DOMAIN_CRASHED = 6;
export const VIR_DOMAIN_PMSUSPENDED = 7;

const stateStrings = {
  [VIR_DOMAIN_NOSTATE]: "N/A",
  [VIR_DOMAIN_RUNNING]: "Running",
  [VIR_DOMAIN_BLOCKED]: "Blocked",
  [VIR_DOMAIN_PAUSED]: "Paused",
  [VIR_DOMAIN_SHUTDOWN]: "Shutdown",
  [VIR_DOMAIN_SHUTOFF]: "Shutoff",
  [VIR_DOMAIN_CRASHED]: "Crashed",
  [VIR_DOMAIN_PMSUSPENDED]: "Suspended",
};

export const stateString = (id) => {
  if (!stateStrings.hasOwnProperty(id)) {
    throw new Error(`Unsupported state ${id}`);
  }

  return stateStrings[id];
};
