import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import Comment from "../components/posts/Comment";

beforeEach(() => {
  setupMatchMedia();
});

const comment = {
  comment_body: "Testing-comment-123",
  created_at: "2021-04-13T12:41:53.282Z",
  comment_type: "ROOT",
  parent_id: 0,
  author: 2,
  post_id: 1,
  comment_id: 2,
  likes: "1",
  author_name: "John Smith",
  children: [],
};

const sentiment = {
  1: {
    2: [
      [
        {
          children: [
            {
              text: "Testing-comment-",
              highlightAgree: true,
            },
            {
              text: "123",
            },
          ],
        },
      ],
      [
        {
          children: [
            {
              text: "Testing-comment-123",
            },
          ],
        },
      ],
    ],
  },
};

test("Comment component renders correctly", () => {
  render(<Comment comment={comment} postId={1} />, {
    initialState: { comments: { 1: { 2: comment } } },
  });

  expect(screen.getByText("Testing-comment-123")).toBeInTheDocument();
});

test("Comment component renders correctly in sentiment view", () => {
  render(<Comment comment={comment} postId={1} sentimentView />, {
    initialState: { comments: { 1: { 2: comment } }, sentiments: sentiment },
  });

  // Sentiment View splits comment text into chars
  expect(screen.queryByText("Testing-comment-123")).toBeNull();
});

test("Comment component renders correctly in sentiment view when no sentiments in redux store", () => {
  render(<Comment comment={comment} postId={1} sentimentView />, {
    initialState: { comments: { 1: { 2: comment } }, sentiments: {} },
  });

  expect(screen.getByText("Testing-comment-123")).toBeInTheDocument();
});
