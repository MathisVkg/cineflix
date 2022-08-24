import { userReducer } from "./reducer/userReducer";

const deletePrefix = (str) => /\.(.+)/.exec(str)[1];
const extractPrefix = (str) => /^([^.]+)/.exec(str)[1];

export const actionTypes = {
  setUser: "user.set"
};

export const reducer = (state, { type, payload }) => {
  switch (extractPrefix(type)) {
    case "user":
      return userReducer(state, { type: deletePrefix(type), payload });
    default:
      return state;
  }
};
