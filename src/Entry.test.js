import { act, render, screen } from "@testing-library/react";
import Entry from "./Entry";

test("renders login form", async () => {
  await act(async () => render(<Entry />));
  const form = screen.getByTestId("login-form");
  expect(form).toBeInTheDocument();
});
