import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "./testUtils";
import Register from "../components/accounts/Register";

test("Register component renders with expected features", () => {
  render(<Register />);

  // Check each form element exists
  expect(screen.getByRole("heading")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Firstname Lastname")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("Register component renders correctly when already logged in", () => {
  render(<Register />, { initialState: { auth: { isSignedIn: true } } });

  //Check conditional rendering works as expected
  expect(screen.queryByText("Already logged in.")).toBeInTheDocument();
});

test("Inputs throw errors if submit clicked and no text inputed", async () => {
  render(<Register />);

  // Click button with empty inputs
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByTestId("emailError")).toBeInTheDocument();
    expect(screen.getByTestId("passwordError")).toBeInTheDocument();
  });
});
