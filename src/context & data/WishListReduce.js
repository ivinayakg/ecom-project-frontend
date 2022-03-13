export const WishListReducer = (state, action) => {
  let { type, payload } = action;
  switch (type) {
    case "add":
      if (state.includes(payload)) {
        return state.filter((entry) => entry !== payload);
      } else return [...state, payload];
    case "remove":
      return state.filter((entry) => {
        return entry !== payload;
      });
    default:
      return state;
  }
};
