import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import DomainHome from "../components/domains/DomainHome";

const match = {
  params: {
    domain: "test",
  },
};

beforeEach(() => {
  setupMatchMedia();
});

test("DomainHome component renders", () => {
  render(<DomainHome match={match} />);

  expect(screen.getByText("test")).toBeInTheDocument();
  expect(screen.queryByText("Create Post")).toBeNull();
  expect(screen.queryByText("Become a representative")).toBeNull();
});

test("DomainHome component renders additional content when signed in and user does not represent this domain", () => {
  render(<DomainHome match={match} />, {
    initialState: {
      auth: {
        isSignedIn: true,
        domainsRepresented: [
          {
            domain: "science",
          },
        ],
      },
    },
  });

  expect(screen.getByText("Create Post")).toBeInTheDocument();
  expect(screen.getByText("Become a representative")).toBeInTheDocument();
});

test("DomainHome component renders additional content when signed in and user already represents this domain", () => {
  render(<DomainHome match={match} />, {
    initialState: {
      auth: {
        isSignedIn: true,
        domainsRepresented: [
          {
            domain: "test",
          },
        ],
      },
    },
  });

  expect(screen.getByText("Create Post")).toBeInTheDocument();
  expect(screen.queryByText("Become a representative")).toBeNull();
});
