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
import { render, screen } from "@testing-library/react";
import Storage from "./Storage";

const diskOptions = {
  bus: "sata",
  dev: "sda",
  file: "",
  driver_name: "qemu",
  driver_type: "raw",
  device: "cdrom",
};

const mockDisk = (options = diskOptions) => {
  options = Object.assign({}, diskOptions, options);

  const data = {
    attrib: {
      device: options.device,
      type: "file",
    },
    driver: {
      attrib: {
        name: options.driver_name,
        type: options.driver_type,
      },
    },
    source: {
      attrib: {
        file: options.file,
      },
    },
    target: {
      attrib: {
        bus: options.bus,
        dev: options.dev,
      },
    },
  };

  if (options.device === "disk") {
    data.block_info = {
      unit: "KiB",
      capacity: 0,
      allocation: 0,
      physical: 0,
    };
  }

  return data;
};

test("Storage renders", async () => {
  const domain = {
    devices: {
      disk: [
        mockDisk({
          file: "/path/to/source.iso",
          device: "cdrom",
        }),
        mockDisk({
          bus: "virtio",
          dev: "vda",
          file: "disk.qcow",
          driver_type: "virtio",
          device: "disk",
        }),
      ],
    },
  };

  render(<Storage domain={domain} />);
});
