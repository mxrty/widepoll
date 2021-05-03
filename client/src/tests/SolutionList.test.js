import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import SolutionList from "../components/solutions/SolutionList";

beforeEach(() => {
  setupMatchMedia();
});

test("SolutionList component renders correctly when no solutions in redux store", () => {
  render(<SolutionList postId={2} domain="test" />, {
    initialState: {
      auth: { isSignedIn: true },
      solutions: {},
    },
  });

  expect(screen.getByText("No Data")).toBeInTheDocument();
  expect(screen.getByText("Create a Solution")).toBeInTheDocument();
});

test("SolutionList component renders correctly when not signed in", () => {
  render(<SolutionList postId={2} domain="test" />, {
    initialState: {
      auth: { isSignedIn: false },
      solutions: {},
    },
  });

  expect(screen.getByText("No Data")).toBeInTheDocument();
  expect(screen.queryByText("Create a Solution")).toBeNull();
});

test("SolutionList component renders correctly", () => {
  render(<SolutionList postId={2} domain="test" />, {
    initialState: {
      auth: { isSignedIn: true },
      solutions: {
        2: {
          1: {
            issue_id: 2,
            created_at: "2021-04-13T15:33:12.579Z",
            title: "Test-title-1234",
            post_body: "Test-body-1234",
            author: 7,
            solution_id: 1,
            likes: 5,
          },
        },
      },
    },
  });

  expect(screen.getByText("SOLUTION: Test-title-1234")).toBeInTheDocument();
  expect(screen.getByText("Create a Solution")).toBeInTheDocument();
});
