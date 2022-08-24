import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import reducers from "./reducers";

const logger = createLogger();

export function configureStore(initialState) {
  const middlewares = [logger];

  return createStore(reducers, initialState, applyMiddleware(...middlewares));
}
