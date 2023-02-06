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
import { sortByName, getDiskSize } from "./Util";

test("sortByName", () => {
  const array = [{ name: "a" }, { name: "b" }, { name: "a" }];
  array.sort(sortByName);
  expect(array).toStrictEqual([{ name: "a" }, { name: "a" }, { name: "b" }]);
});

test("getDiskSize KB", () => {
  const kbytes = 36;
  const [quantity, unit] = getDiskSize(kbytes);
  expect(quantity).toStrictEqual("36.0");
  expect(unit).toBe("KB");
});

test("getDiskSize MB", () => {
  const kbytes = 1536;
  const [quantity, unit] = getDiskSize(kbytes);
  expect(quantity).toStrictEqual("1.5");
  expect(unit).toBe("MB");
});

test("getDiskSize GB", () => {
  const kbytes = 1536 * 1024;
  const [quantity, unit] = getDiskSize(kbytes);
  expect(quantity).toStrictEqual("1.5");
  expect(unit).toBe("GB");
});

test("getDiskSize TB", () => {
  const kbytes = 1536 * 1024 * 1024;
  const [quantity, unit] = getDiskSize(kbytes);
  expect(quantity).toStrictEqual("1.5");
  expect(unit).toBe("TB");
});

test("getDiskSize PB", () => {
  const kbytes = 1536 * 1024 * 1024 * 1024;
  const [quantity, unit] = getDiskSize(kbytes);
  expect(quantity).toStrictEqual("1.5");
  expect(unit).toBe("PB");
});
