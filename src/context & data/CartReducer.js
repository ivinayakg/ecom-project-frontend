export const CartReducer = (cartState, action) => {
  let { type, payload } = action;

  switch (type) {
    case "add":
      return {
        ...cartState,
        data: addToCart(payload, cartState.data),
      };
    case "remove":
      return {
        ...cartState,
        data: deleteFromCart(payload, cartState.data),
      };
    case "update":
      return {
        ...cartState,
        data: updateQuantity(payload.id, payload.sign, cartState.data),
      };
    case "updateCart":
      return {
        ...cartState,
        totalQauntity: cartState.data.reduce(
          (prev, curr) => prev + curr.quantity,
          0
        ),
      };
    default:
      return cartState;
  }
};

const addToCart = (data, state) => {
  let firstTime = true;
  let prodcs = state.map((entry) => {
    if (entry.id === data.id) {
      firstTime = false;
      return { ...entry, quantity: entry.quantity + 1 };
    } else return entry;
  });

  if (firstTime) prodcs.push({ ...data, quantity: 1 });

  return prodcs;
};

const deleteFromCart = (id, state) => state.filter((entry) => entry.id !== id);

const updateQuantity = (id, sign, state) => {
  let products = state.map((entry) => {
    if (entry.id === id) {
      let newData = {
        ...entry,
        quantity: sign === "+" ? entry.quantity + 1 : entry.quantity - 1,
      };
      return newData.quantity > 0 ? newData : false;
    } else return entry;
  });

  return products.filter((entry) => entry);
};
