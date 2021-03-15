import React from "react";
import { Provider } from "react-redux";
import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/lib/integration/react";
import reducers from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);
const persistor = persistStore(store);

function render(ui, { initialState, ...renderOptions } = {}) {
  const store = createStore(reducers, initialState);
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
    // return (
    //   <Provider store={store}>
    //     <PersistGate persistor={persistor}>{children}</PersistGate>
    //   </Provider>
    // );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
