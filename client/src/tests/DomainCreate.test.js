import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "./testUtils";
import DomainCreate from "../components/domains/DomainCreate";

test("DomainCreate component renders form when logged in", () => {
  render(<DomainCreate />, { initialState: { auth: { isSignedIn: true } } });

  // Check each form element exists
  expect(screen.getByRole("heading")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Domain name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Domain description")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("DomainCreate component renders correctly when user is not logged in", () => {
  render(<DomainCreate />, { initialState: { auth: { isSignedIn: false } } });

  //Check conditional rendering works as expected
  expect(
    screen.queryByText("You must be signed in to create a domain")
  ).toBeInTheDocument();
});

test("Inputs throw errors if submit clicked and no text inputed", async () => {
  render(<DomainCreate />, { initialState: { auth: { isSignedIn: true } } });

  // Click button with empty inputs
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByTestId("domainNameError")).toBeInTheDocument();
  });
});
