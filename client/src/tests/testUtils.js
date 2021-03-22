import React from "react";
import { Provider } from "react-redux";
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
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
