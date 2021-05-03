import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import RecentPosts from "../components/posts/RecentPosts";

beforeEach(() => {
  setupMatchMedia();
});

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
  3: {
    post_id: 3,
    title: "B-title",
    post_body: "B-body",
    created_at: "2021-04-13T11:43:18.418Z",
    domain: "uspolitics",
    post_type: "DISCUSSION",
    author: 5,
    likes: 0,
  },
};

test("RecentPosts component renders correctly if no posts in redux store", () => {
  render(<RecentPosts />, {
    initialState: {
      posts: {},
    },
  });

  expect(screen.getByText("Recent Posts")).toBeInTheDocument();
  expect(screen.getByText("No Data")).toBeInTheDocument();
});

test("RecentPosts component renders correctly", () => {
  render(<RecentPosts />, {
    initialState: {
      posts: posts,
    },
  });

  expect(screen.getByText("A-title")).toBeInTheDocument();
  expect(screen.getByText("B-title")).toBeInTheDocument();
});
