import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, cleanup } from "./testUtils";
import Login from "../components/accounts/Login";

/*
Assert element is missing -> use queryBy
getBy returns an error or object
findBy for async
*/

afterEach(cleanup);

describe("Login", () => {
  test("Login component renders with expected features", () => {
    render(<Login />);

    // Check each form element exists
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("Login", () => {
  test("Login component renders with expected features when already logged in", () => {
    render(<Login />, { initialState: { auth: { isSignedIn: true } } });

    //Check conditional rendering works as expected
    expect(screen.queryByText("Already logged in.")).toBeInTheDocument();
  });
});
