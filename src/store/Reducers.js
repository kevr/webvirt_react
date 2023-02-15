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
import {
  REMOVE_SESSION,
  SET_APP_TITLE,
  SET_SESSION,
  SET_VIRT_DOMAIN,
  SET_VIRT_DOMAINS,
  SET_VIRT_HOST,
  SET_VIRT_NETWORKS,
} from "./Actions";
import { AttributeProxy, DomainsProxy } from "./Proxy";

const defaultSessionState = {};

export const sessionReducer = (state = defaultSessionState, action) => {
  switch (action.type) {
    case SET_SESSION:
      const updatedState = Object.assign({}, state, action.session, {
        authenticated: true,
      });
      localStorage.setItem("session", JSON.stringify(updatedState));
      return updatedState;
    case REMOVE_SESSION:
      localStorage.removeItem("session");
      return defaultSessionState;
    default:
      return state;
  }
};

const defaultVirtState = { domains: DomainsProxy() };

// An object form of DomainProxy: we must be able to use DomainProxy
// as an object to be stored in Redux alongside the real domain data
// to allow for seamless attributes.
const defaultDomainState = {
  attrib: {},
  uuid: AttributeProxy(),
  vcpu: AttributeProxy(),
  memory: AttributeProxy(),
  devices: {
    disk: [],
    interface: [],
    emulator: {},
  },
  os: AttributeProxy(),
};

export const virtReducer = (state = defaultVirtState, action) => {
  switch (action.type) {
    case SET_VIRT_DOMAIN:
      const o = Object.assign({}, state, {
        domains: Object.assign({}, state.domains, {
          [action.domain.name]: Object.assign(
            {},
            state.domains[action.domain.name],
            action.domain
          ),
        }),
      });
      return o;
    case SET_VIRT_DOMAINS:
      const domains = action.domains.map((domain) => {
        return Object.assign({}, defaultDomainState, domain);
      });
      const object = {};
      domains.forEach((domain, index) => {
        object[domain.name] = domain;
      });
      return Object.assign({}, state, { domains: object });
    default:
      return state;
  }
};

const defaultNetworksState = [];

export const virtNetworkReducer = (state = defaultNetworksState, action) => {
  switch (action.type) {
    case SET_VIRT_NETWORKS:
      return action.networks;
    default:
      return state;
  }
};

const defaultHostState = {};
export const virtHostReducer = (state = defaultHostState, action) => {
  switch (action.type) {
    case SET_VIRT_HOST:
      return action.host;
    default:
      return state;
  }
};

const defaultAppState = {
  title: "webvirt",
};

export const appReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case SET_APP_TITLE:
      return Object.assign({}, state, { title: action.title });
    default:
      return state;
  }
};
