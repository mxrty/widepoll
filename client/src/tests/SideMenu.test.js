import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, setupMatchMedia } from "./testUtils";
import SideMenu from "../components/layout/SideMenu";

beforeEach(() => {
  setupMatchMedia();
});

test("SideMenu component renders correctly", () => {
  render(<SideMenu />);

  expect(screen.getByText("Explore")).toBeInTheDocument();
  expect(screen.getByText("Poll")).toBeInTheDocument();
});
