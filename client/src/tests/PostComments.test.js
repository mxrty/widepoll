import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import PostComments from "../components/posts/PostComments";

beforeEach(() => {
  setupMatchMedia();
});

test("PostComments component renders", () => {
  render(<PostComments postId={3} />);

  expect(screen.getByText("Comments")).toBeInTheDocument();
  expect(screen.getByText("Sentiments")).toBeInTheDocument();
});

test("PostComments component renders root comment and child", () => {
  render(<PostComments postId={3} />, {
    initialState: {
      comments: {
        3: {
          9: {
            comment_body: "Test-comment-387",
            created_at: "2021-04-13T14:08:25.227Z",
            comment_type: "ROOT",
            parent_id: 0,
            author: 3,
            post_id: 3,
            comment_id: 9,
            likes: "1",
            author_name: "Tycho Firmin",
            children: [10],
          },
          10: {
            comment_body: "Test-comment-892",
            created_at: "2021-04-13T14:08:57.918Z",
            comment_type: "REPLY",
            parent_id: 0,
            author: 5,
            post_id: 3,
            comment_id: 10,
            likes: "0",
            author_name: "Agathe Gerhard",
            children: [],
          },
        },
      },
    },
  });

  expect(screen.getByText("Test-comment-387")).toBeInTheDocument();
  expect(screen.getByText("Test-comment-892")).toBeInTheDocument();
});
