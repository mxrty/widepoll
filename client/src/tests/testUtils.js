import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "../reducers";

/*
Testing agenda:
* component appears correctly
* component handles missing props correctly
* interactive components behave correctly
* rerender works correctly when props are updated
*/

function render(ui, { initialState, ...renderOptions } = {}) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(reduxThunk)
  );
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const setupMatchMedia = () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { render, setupMatchMedia };
