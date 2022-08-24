export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "set":
      return { ...state, user: payload };
    default:
      return state;
  }
};
