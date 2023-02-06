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
export const sortByName = (a, b) => {
  if (a.name < b.name) return -1;
  else if (a.name > b.name) return 1;
  return 0;
};

export const navigateLogin = (location, navigate) => {
  const uri = encodeURIComponent(location.pathname);
  return navigate(`/login?next=${uri}`);
};

export const getDiskSize = (kbytes) => {
  let unit = "KB";

  if (kbytes > 1024) {
    // Convert to megabytes
    unit = "MB";
    kbytes = kbytes / 1024;
  }

  if (kbytes > 1024) {
    // Convert to gigabytes
    unit = "GB";
    kbytes = kbytes / 1024;
  }

  if (kbytes > 1024) {
    // Convert to terabytes
    unit = "TB";
    kbytes = kbytes / 1024;
  }

  if (kbytes > 1024) {
    // Convert to petabytes
    unit = "PB";
    kbytes = kbytes / 1024;
  }

  return [kbytes.toFixed(1), unit];
};
