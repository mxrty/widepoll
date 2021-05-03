import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "./testUtils";
import CommentCreate from "../components/posts/CommentCreate";

test("CommentCreate component renders form when logged in", () => {
  render(<CommentCreate />, { initialState: { auth: { isSignedIn: true } } });

  // Check each form element exists
  expect(screen.getByPlaceholderText("Reply")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("Formik throws errors if submit clicked and no text inputed", async () => {
  render(<CommentCreate />, { initialState: { auth: { isSignedIn: true } } });

  // Click button with empty inputs
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByTestId("commentError")).toBeInTheDocument();
  });
});

test("CommentCreate component renders null when not logged in", () => {
  const { container } = render(<CommentCreate />, {
    initialState: { auth: { isSignedIn: false } },
  });

  expect(container).toBeEmptyDOMElement();
});
