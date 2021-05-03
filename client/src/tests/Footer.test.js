import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "./testUtils";
import Footer from "../components/layout/Footer";

test("Footer component renders correctly", () => {
  render(<Footer />);

  expect(
    screen.getByText("widepoll ©2021 created by @mxrty")
  ).toBeInTheDocument();
});
