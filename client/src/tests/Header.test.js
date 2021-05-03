import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "./testUtils";
import Header from "../components/layout/Header";

test("Header component renders correctly when not signed in", () => {
  render(<Header />);

  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("Register")).toBeInTheDocument();
});

test("Header component renders correctly when signed in", () => {
  render(<Header />, {
    initialState: {
      auth: { isSignedIn: true, user_id: 6, user_name: "John Smith" },
    },
  });

  expect(screen.queryByText("Login")).toBeNull();
  expect(screen.queryByText("Register")).toBeNull();
  expect(screen.getByText("Hello John Smith")).toBeInTheDocument();
  expect(screen.getByText("Logout")).toBeInTheDocument();
});
