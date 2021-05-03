import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import PollShow from "../components/polls/PollShow";

beforeEach(() => {
  setupMatchMedia();
});

const match = {
  params: {
    pollId: 22,
  },
};

const polls = {
  22: {
    title: "Test poll?",
    description: "Is visible?",
    author: 2,
    created_at: "2021-04-30T22:46:15.490Z",
    poll_id: 22,
    options: [
      {
        option_id: 4,
        body: "nono",
        votes: "0",
      },
      {
        option_id: 3,
        body: "YESYES",
        votes: "0",
      },
    ],
  },
};

test("PollShow component renders correctly if no poll matching in redux store", () => {
  const { container } = render(<PollShow match={match} />, {
    initialState: {
      polls: {},
    },
  });

  expect(container).toBeEmptyDOMElement();
});

test("PollShow component renders correctly", () => {
  render(<PollShow match={match} />, {
    initialState: {
      polls: polls,
    },
  });

  expect(screen.getByRole("heading")).toBeInTheDocument();
  expect(screen.getByText("nono")).toBeInTheDocument();
  expect(screen.getByText("YESYES")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});
