export const addressReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "add":
      return [...state, payload];
    case "remove":
      return state.filter((entry) => entry.id !== payload.id);
    case "update":
      return state.map((entry) => (entry.id === payload.id ? payload : entry));
    default:
      return state;
  }
};
