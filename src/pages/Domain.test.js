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
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import { createStore } from "../store";
import { setSession } from "../store/Actions";
import { stateString, VIR_DOMAIN_RUNNING } from "../API";
import { appRoutes } from "../Routing";

let queryClient = new QueryClient();

beforeEach(() => {
  queryClient = new QueryClient();
});

const mockDomainDisk = (file, dev, bus) => ({
  device: "disk",
  driver: {
    name: "qemu",
    type: "sata",
  },
  source: { file },
  target: { dev, bus },
  block_info: {
    capacity: 0,
    allocation: 0,
    physical: 0,
  },
});

const mockDomainInterface = (name, model, macAddress) => ({
  name,
  model,
  macAddress,
});

const mockDomainJson = (name, id, stateId) => ({
  id: id,
  name: name,
  state: {
    id: stateId,
    string: stateString(stateId),
  },
  info: {
    cpus: 2,
    maxMemory: 1024 * 1000,
    memory: 1024 * 1000,
    os: {
      type: {
        arch: "x86_64",
        machine: "pc-q35-7.2",
      },
      boot: {
        dev: "hd",
      },
    },
    devices: {
      disks: [mockDomainDisk("disk.qcow", "vda", "virtio")],
      interfaces: [
        mockDomainInterface("net0", "virtio", "aa:bb:cc:dd:11:22:33:44"),
      ],
    },
  },
});

test("Domain renders", async () => {
  const router = createMemoryRouter(appRoutes, {
    initialEntries: ["/domains/test"],
  });

  const store = createStore();
  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  const domain = mockDomainJson("test", 1, VIR_DOMAIN_RUNNING);
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
    .mockReturnValue(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(domain),
      })
    );

  await act(
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

  const iface = screen.getByTestId("interface");
  expect(iface).toBeInTheDocument();

  const disk = screen.getByTestId("disk");
  expect(disk).toBeInTheDocument();
});

test("Domain gracefully navigates to /", async () => {
  const router = createMemoryRouter(appRoutes, {
    initialEntries: ["/domains/test"],
  });

  const store = createStore();
  store.dispatch(
    setSession({
      user: "test",
      access: "test_access",
      refresh: "test_refresh",
    })
  );

  fetch
    .mockReturnValueOnce(
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
    )
    .mockReturnValueOnce(
      // Mock /domains/test/ query response
      Promise.resolve({
        status: 404,
        json: () =>
          Promise.resolve({
            detail: "Domain does not exist",
          }),
      })
    )
    .mockReturnValueOnce(
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
    )
    .mockReturnValueOnce(
      // Mock /domains/ query response
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve([]),
      })
    );

  await act(
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

  expect(fetch).toBeCalledTimes(4);
  expect(router.state.location.pathname).toBe("/");
});
