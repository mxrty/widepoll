import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import Home from "../components/app/Home";

beforeEach(() => {
  setupMatchMedia();
});

test("Home component renders correctly when user is signed in", () => {
  render(<Home />, {
    initialState: {
      auth: { isSignedIn: true, user_id: 6 },
    },
  });

  expect(screen.getByText("Create a new domain")).toBeInTheDocument();
});

test("Home component renders correctly when user is not signed in", () => {
  render(<Home />, {
    initialState: {
      auth: { isSignedIn: false },
    },
  });

  expect(screen.queryByText("Create a new domain")).toBeNull();
});
