import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import PollResults from "../components/polls/PollResults";

beforeEach(() => {
  setupMatchMedia();
});

const match = {
  params: {
    pollId: 22,
  },
};

const polls = {
  2: {
    post_id: 2,
    title: "A-title",
    post_body: "A-body",
    created_at: "2021-04-13T11:35:26.191Z",
    domain: "test",
    post_type: "ISSUE",
    author: 6,
    author_name: "John Smith",
    likes: 0,
  },
};

// test("PollResults component renders post body", () => {
//   render(<PollResults match={match} />, {
//     initialState: {
//       polls: polls,
//     },
//   });

//   expect(screen.getByText("submitted by John Smith")).toBeInTheDocument();
// });

test("PollResults component renders correctly if no poll matching in redux store", () => {
  const { container } = render(<PollResults match={match} />, {
    initialState: {
      polls: {},
    },
  });

  expect(container).toBeEmptyDOMElement();
});
