import React, { useReducer } from "react";

import { reducer } from "./reducer";
import { ApplicationContext } from "./ApplicationContext";

const initialState = {};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ApplicationContext.Provider value={{ context: state, dispatch }}>{children}</ApplicationContext.Provider>;
};
