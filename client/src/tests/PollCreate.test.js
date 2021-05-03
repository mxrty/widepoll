import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { render, screen, waitFor, setupMatchMedia } from "./testUtils";
import PollCreate from "../components/polls/PollCreate";

beforeEach(() => {
  setupMatchMedia();
});

test("DomainCreate component renders form when logged in", () => {
  render(<PollCreate />, { initialState: { auth: { isSignedIn: true } } });

  // Check each form element exists
  expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  expect(screen.getByText("Options:")).toBeInTheDocument();
  expect(screen.getByText("Add poll option")).toBeInTheDocument();
  expect(screen.getByText("Create Poll")).toBeInTheDocument();
});

test("DomainCreate component renders correctly when user is not logged in", () => {
  render(<PollCreate />);

  //Check conditional rendering works as expected
  expect(
    screen.queryByText("You must be signed in to create a poll")
  ).toBeInTheDocument();
});

test("Inputs throw errors if submit clicked and no text inputed", async () => {
  render(<PollCreate />, { initialState: { auth: { isSignedIn: true } } });

  // Click button with empty inputs
  const submitButton = screen.getByText("Create Poll");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByTestId("titleError")).toBeInTheDocument();
  });
});
