import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "./testUtils";
import SolutionCreate from "../components/solutions/SolutionCreate";

test("SolutionCreate component renders form", () => {
  render(<SolutionCreate />);

  // Check each form element exists
  expect(screen.getByRole("heading")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Post title")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Post body")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("Inputs throw errors if submit clicked and no text inputed", async () => {
  render(<SolutionCreate />);

  // Click button with empty inputs
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByTestId("titleError")).toBeInTheDocument();
    expect(screen.getByTestId("bodyError")).toBeInTheDocument();
  });
});
