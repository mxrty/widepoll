import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import PostFeed from "../components/posts/PostFeed";

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

test("PostFeed component renders", () => {
  render(<PostFeed />);

  expect(screen.getByText("All")).toBeInTheDocument();
  expect(screen.getByText("Issues")).toBeInTheDocument();
  expect(screen.getByText("Discussions")).toBeInTheDocument();
  expect(screen.getByText("No Data")).toBeInTheDocument();
});

test("PostFeed component renders all posts when domain name not specified", () => {
  render(<PostFeed />, {
    initialState: {
      posts: posts,
    },
  });

  expect(screen.getByText("ISSUE: A-title")).toBeInTheDocument();
  expect(screen.getByText("A-body")).toBeInTheDocument();
  expect(screen.getByText("DISCUSSION: B-title")).toBeInTheDocument();
  expect(screen.getByText("B-body")).toBeInTheDocument();
});

test("PostFeed component renders only posts for domain when domain name is specified", () => {
  render(<PostFeed domainName="test" />, {
    initialState: {
      posts: posts,
    },
  });

  expect(screen.getByText("ISSUE: A-title")).toBeInTheDocument();
  expect(screen.getByText("A-body")).toBeInTheDocument();
  expect(screen.queryByText("DISCUSSION: B-title")).toBeNull();
  expect(screen.queryByText("B-body")).toBeNull();
});
