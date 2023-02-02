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
export const REMOVE_SESSION = "REMOVE_SESSION";
export const SET_SESSION = "SET_SESSION";

export const removeSession = () => ({
  type: REMOVE_SESSION,
});

export const setSession = (session) => ({
  type: SET_SESSION,
  session: session,
});

export const SET_VIRT_DOMAIN = "SET_VIRT_DOMAIN";
export const SET_VIRT_DOMAINS = "SET_VIRT_DOMAINS";

export const setVirtDomain = (domain) => ({
  type: SET_VIRT_DOMAIN,
  domain: domain,
});

export const setVirtDomains = (domains) => ({
  type: SET_VIRT_DOMAINS,
  domains: domains,
});

export const SET_APP_TITLE = "SET_APP_TITLE";
export const REMOVE_APP_TITLE = "REMOVE_APP_TITLE";

export const setAppTitle = (title) => ({
  type: SET_APP_TITLE,
  title: title,
});

export const removeAppTitle = () => ({
  type: REMOVE_APP_TITLE,
});
