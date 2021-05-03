import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "./testUtils";
import DomainList from "../components/domains/DomainList";

test("DomainList component renders a list of domains in redux store", () => {
  render(<DomainList />, {
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

  expect(screen.getByText("/d/test")).toBeInTheDocument();
});
