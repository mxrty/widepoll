import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import PostShow from "../components/posts/PostShow";

beforeEach(() => {
  setupMatchMedia();
});

const match = {
  params: {
    postId: 2,
  },
};

const posts = {
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

test("PostShow component renders post body", () => {
  render(<PostShow match={match} />, {
    initialState: {
      posts: posts,
    },
  });

  expect(screen.getByText("submitted by John Smith")).toBeInTheDocument();
});

test("PostShow component renders correctly if no post matching in redux store", () => {
  render(<PostShow match={match} />, {
    initialState: {
      posts: {},
    },
  });

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
