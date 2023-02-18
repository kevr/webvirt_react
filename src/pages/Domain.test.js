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
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import { createStore } from "../store";
import { setSession } from "../store/Actions";
import { stateString, VIR_DOMAIN_RUNNING, VIR_DOMAIN_SHUTOFF } from "../API";
import { appRoutes } from "../Routing";
import { domainDiskJson, domainInterfaceJson, domainJson } from "../Data";

let queryClient = new QueryClient();

let router;
let store;

beforeEach(() => {
  queryClient = new QueryClient();

  router = createMemoryRouter(appRoutes, {
    initialEntries: ["/domains/test"],
  });

  store = createStore();
  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  fetch.mockReturnValueOnce(
    // Mock /auth/refresh/ query response
    Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          user: "test",
          access: "new_access_token",
          refresh: "new_refresh_token",
        }),
    })
  );
});

const renderDomain = () =>
  act(
    async () =>
      await render(
        <Provider store={store}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </HelmetProvider>
        </Provider>
      )
  );

test("Domain renders", async () => {
  const domain = domainJson(
    "test",
    "",
    1,
    VIR_DOMAIN_RUNNING,
    [domainDiskJson("disk.qcow", "vda", "virtio")],
    [domainInterfaceJson("net0", "virtio", "aa:bb:cc:dd:11:22:33:44")]
  );
  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(domain),
    })
  );

  await renderDomain();

  // Expect a network interface to be displayed
  const iface = screen.getByTestId("interface");
  expect(iface).toBeInTheDocument();

  // Expect a disk to be displayed
  const disk = screen.getByTestId("disk");
  expect(disk).toBeInTheDocument();

  // Expect Resources to be displayed
  const vcpus = screen.getByTestId("resources-vcpus-value");
  expect(vcpus.textContent).toBe("2");
  const memory = screen.getByTestId("resources-memory-value");
  expect(memory.textContent).toBe("1024 / 1024 MB");

  domain["title"] = "Test Title";
  fetch
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            title: "Test Title",
          }),
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(domain),
      })
    );

  const input = screen.getByTestId("title-input");
  expect(input).toBeInTheDocument();

  await act(
    async () =>
      await fireEvent.input(input, { target: { value: "Test Title" } })
  );
  await act(async () => await fireEvent.blur(input));
});

test("Domain renders custom title", async () => {
  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  const domain = domainJson(
    "test",
    "Custom Title",
    1,
    VIR_DOMAIN_RUNNING,
    [domainDiskJson("disk.qcow", "vda", "virtio")],
    [domainInterfaceJson("net0", "virtio", "aa:bb:cc:dd:11:22:33:44")]
  );
  fetch.mockReturnValue(
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(domain),
    })
  );

  await renderDomain();

  const iface = screen.getByTestId("interface");
  expect(iface).toBeInTheDocument();

  const disk = screen.getByTestId("disk");
  expect(disk).toBeInTheDocument();
});

test("Domain options can be changed", async () => {
  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  const domain = domainJson("test", "Test Title", 1, VIR_DOMAIN_RUNNING);
  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(domain),
    })
  );

  const { rerender } = await renderDomain();
  // Test that autostart-checkbox can be clicked and results in a "done" icon.
  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ autostart: true }),
    })
  );

  let checkbox = screen.getByTestId("autostart-checkbox");
  await act(async () => await fireEvent.click(checkbox));

  const done = screen.getByText("done");
  expect(done).toBeInTheDocument();

  fetch.mockReturnValueOnce(
    Promise.resolve({
      status: 500,
      json: () =>
        Promise.resolve({
          detail: "Some crazy error",
        }),
    })
  );

  checkbox = screen.getByTestId("autostart-checkbox");
  await act(async () => await fireEvent.click(checkbox));

  const close = screen.getByText("close");
  expect(close).toBeInTheDocument();

  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();

  expect(
    screen.getByTestId("bootmenu-checkbox-label-annotation").textContent
  ).toBe("(disabled while running)");

  // Render a new domain view with Shutoff state.
  domain.state.attrib.id = VIR_DOMAIN_SHUTOFF;
  domain.state.attrib.string = stateString(VIR_DOMAIN_SHUTOFF);
  fetch
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            user: "test",
            access: "new_access_token",
            refresh: "new_refresh_token",
          }),
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(domain),
      })
    );

  rerender(
    <Provider store={store}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </Provider>
  );

  // Change "Enable boot menu" state.
  domain.os.bootmenu.attrib.enable = "yes";
  fetch
    .mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(domain.info.os),
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve(domain),
      })
    );

  rerender(
    <Provider store={store}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </Provider>
  );

  expect(
    screen.queryByTestId("bootmenu-checkbox-label-annotation")
  ).not.toBeInTheDocument();

  checkbox = screen.getByTestId("bootmenu-checkbox");
  await act(async () => await fireEvent.click(checkbox));

  checkbox = screen.getByTestId("bootmenu-checkbox");
  expect(checkbox.checked).toEqual(true);
});

test("Domain handles API error", async () => {
  fetch.mockReturnValueOnce(
    // Mock /domains/test/ query response
    Promise.resolve({
      status: 404,
      json: () =>
        Promise.resolve({
          detail: "Domain does not exist",
        }),
    })
  );

  await renderDomain();

  expect(fetch).toBeCalledTimes(2);

  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
});
