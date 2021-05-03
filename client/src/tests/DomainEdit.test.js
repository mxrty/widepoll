import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "./testUtils";
import DomainEdit from "../components/domains/DomainEdit";

const match = {
  params: {
    domain: "test",
  },
};

test("DomainEdit component renders form when logged in", () => {
  render(<DomainEdit match={match} />, {
    initialState: {
      auth: { isSignedIn: true },
      domains: {
        test: {
          domain_name: "test",
          owner: 1,
          created_at: "2021-04-12T11:07:21.023Z",
          description: "test",
        },
      },
    },
  });

  // Check each form element exists
  expect(screen.getByPlaceholderText("Domain description")).toBeInTheDocument();
});

test("DomainEdit component renders form when logged in but no domain in redux store", () => {
  render(<DomainEdit match={match} />, {
    initialState: { auth: { isSignedIn: true } },
  });

  expect(screen.getByText("No domain to edit")).toBeInTheDocument();
});

test("DomainEdit component renders correctly when user is not logged in", () => {
  render(<DomainEdit match={match} />, {
    initialState: { auth: { isSignedIn: false } },
  });

  //Check conditional rendering works as expected
  expect(
    screen.queryByText("You must be signed in to edit a domain")
  ).toBeInTheDocument();
});
