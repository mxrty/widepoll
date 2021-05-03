import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import SolutionShow from "../components/solutions/SolutionShow";

beforeEach(() => {
  setupMatchMedia();
});

const match = {
  params: {
    postId: 2,
    solutionId: 4,
  },
};

const solutions = {
  2: {
    4: {
      issue_id: 2,
      created_at: "2021-04-13T15:33:12.579Z",
      title: "Test-title-1234",
      post_body: "Test-body-1234",
      author: 7,
      author_name: "Bilbo Baggins",
      solution_id: 4,
      likes: 0,
    },
  },
};

test("SolutionShow component renders post body", () => {
  render(<SolutionShow match={match} />, {
    initialState: {
      solutions: solutions,
    },
  });

  expect(screen.getByText("submitted by Bilbo Baggins")).toBeInTheDocument();
});

test("SolutionShow component renders correctly if no post matching in redux store", () => {
  render(<SolutionShow match={match} />, {
    initialState: {
      solutions: {},
    },
  });

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
