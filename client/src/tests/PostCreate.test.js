import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "./testUtils";
import PostCreate from "../components/posts/PostCreate";

const match = {
  params: {
    domain: "test",
  },
};

test("PostCreate component renders form", () => {
  render(<PostCreate match={match} />);

  // Check each form element exists
  expect(screen.getByRole("heading")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Post title")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Post body")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("Inputs throw errors if submit clicked and no text inputed", async () => {
  render(<PostCreate match={match} />);

  // Click button with empty inputs
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByTestId("titleError")).toBeInTheDocument();
  });
});
