import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "./testUtils";
import SentimentEditor from "../components/app/SentimentEditor";

test("SentimentEditor component renders correctly when user is signed in", () => {
  const content = "test-string-123";
  render(<SentimentEditor textValue={content} />);

  expect(screen.getByText(content)).toBeInTheDocument();
});
