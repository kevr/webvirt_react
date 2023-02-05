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
import Networking from "./Networking";

test("Networking renders unassigned name", async () => {
  const domain = {
    info: {
      devices: {
        interfaces: [
          {
            name: "",
            model: "virtio",
            macAddress: "aa:bb:cc:dd:11:22:33:44",
          },
        ],
      },
    },
  };

  render(<Networking domain={domain} />);

  const name = screen.getByTestId("interface-name");
  expect(name.textContent).toBe("(unassigned)");

  const model = screen.getByTestId("interface-model");
  expect(model.textContent).toBe("virtio");

  const mac = screen.getByTestId("interface-mac");
  expect(mac.textContent).toBe("aa:bb:cc:dd:11:22:33:44");
});
