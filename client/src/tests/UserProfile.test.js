import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { render, screen, setupMatchMedia } from "./testUtils";
import UserProfile from "../components/accounts/UserProfile";

const match = {
  params: {
    userId: 1,
  },
};

const mockRegularUser = {
  user_id: 1,
  user_name: "John Smith",
  isRep: false,
  followers: [],
  following: [
    {
      rep_id: 1,
      rank: 0,
    },
    {
      rep_id: 2,
      rank: 1,
    },
  ],
};

const mockRepresentativeUser = {
  user_id: 1,
  user_name: "John Smith",
  isRep: true,
  followers: [],
  following: [
    {
      rep_id: 1,
      rank: 0,
    },
    {
      rep_id: 2,
      rank: 1,
    },
  ],
};

beforeEach(() => {
  setupMatchMedia();
});

test("UserProfile component renders correctly when user is not found", () => {
  render(<UserProfile match={match} />);

  // Check conditional rendering works when component has no user
  expect(screen.getByTestId("default")).toBeInTheDocument();
});

test("UserProfile component renders correctly when user is not a representative", () => {
  render(<UserProfile match={match} />, {
    initialState: {
      auth: { isSignedIn: true, user_id: 6 },
      users: {
        1: mockRegularUser,
      },
    },
  });

  // Check conditional rendering works when component has no user
  expect(screen.queryByTestId("default")).toBeNull();
});

test("UserProfile component renders correctly when user is a representative, current user is logged in and user prop has followers and is following reps", () => {
  render(<UserProfile match={match} />, {
    initialState: {
      auth: { isSignedIn: true, user_id: 6 },
      users: {
        1: mockRepresentativeUser,
      },
    },
  });

  // Check conditional rendering works when component has no user
  expect(screen.queryByTestId("default")).toBeNull();
});
