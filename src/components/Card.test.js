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
import { render, screen, within } from "@testing-library/react";
import Card from "./Card";

test("Card renders", async () => {
  render(
    <Card title={"Test Card"}>
      <span data-testid="child-element">{"Test content."}</span>
    </Card>
  );

  const title = screen.getByTestId("card-title");
  expect(title).toBeInTheDocument();
  expect(title.textContent).toBe("Test Card");

  const child = screen.getByTestId("child-element");
  expect(child).toBeInTheDocument();
});
