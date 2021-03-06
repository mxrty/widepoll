import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "./testUtils";
import Login from "../components/accounts/Login";

test("Login component renders with expected features", () => {
  render(<Login />);

  // Check each form element exists
  expect(screen.getByRole("heading")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("Login component renders correctly when already logged in", () => {
  render(<Login />, { initialState: { auth: { isSignedIn: true } } });

  //Check conditional rendering works as expected
  expect(screen.queryByText("Already logged in.")).toBeInTheDocument();
});

test("Email and password inputs throw errors if submit clicked and no text inputed", async () => {
  render(<Login />);

  // Click button with empty inputs
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByTestId("emailError")).toBeInTheDocument();
    expect(screen.getByTestId("passwordError")).toBeInTheDocument();
  });
});
