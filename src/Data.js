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
import { stateString } from "./API";

export const domainDiskJson = (file, dev, bus) => ({
  attrib: {
    device: "disk",
  },
  driver: {
    attrib: {
      name: "qemu",
      type: "sata",
    },
  },
  source: { attrib: { file } },
  target: { attrib: { dev, bus } },
  block_info: {
    capacity: 0,
    allocation: 0,
    physical: 0,
  },
});

export const domainInterfaceJson = (name, type, address) => ({
  alias: {
    attrib: { name },
  },
  attrib: { type: "user" },
  mac: {
    attrib: { address },
  },
  model: {
    attrib: { type },
  },
});

export const domainJson = (
  name,
  title,
  id,
  stateId,
  disk = [],
  interface_ = []
) => ({
  id: id,
  name: {
    text: name,
  },
  uuid: {
    text: "1234-abcd",
  },
  title: {
    text: title,
  },
  state: {
    attrib: {
      id: stateId,
      string: stateString(stateId),
    },
  },
  vcpu: {
    text: "2",
  },
  memory: {
    text: 1024 * 1024,
  },
  currentMemory: {
    text: 1024 * 1024,
  },
  os: {
    type: {
      attrib: {
        arch: "x86_64",
        machine: "pc-q35-7.2",
      },
    },
    boot: {
      attrib: {
        dev: "hd",
      },
    },
    bootmenu: {
      attrib: {
        enable: "no",
      },
    },
  },
  devices: {
    disk: disk,
    interface: interface_,
    emulator: {
      text: "qemu-system-x86_64",
    },
  },
});
