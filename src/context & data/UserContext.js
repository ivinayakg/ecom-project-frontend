import { createContext, useContext, useEffect, useReducer } from "react";
import { CartReducer } from "./CartReducer";
import { WishListReducer } from "./WishListReduce";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, {
    cart: {
      data: JSON.parse(localStorage.getItem("cartData")) ?? [],
      totalQauntity: 0,
    },
    wishlist: JSON.parse(localStorage.getItem("wishlistData")) ?? [],
    userData: { isAuth: false },
  });

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(state.cart.data));
    dispatch({ for: "cart", type: "updateCart" });
  }, [state.cart.data]);

  useEffect(() => {
    localStorage.setItem("wishlistData", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

const GlobalReducer = (state, action) => {
  switch (action.for) {
    case "cart":
      return {
        ...state,
        cart: CartReducer(state.cart, action),
      };
    case "wishlist":
      let data = WishListReducer(state.wishlist, action);
      return {
        ...state,
        wishlist: data,
      };
    default:
      return state;
  }
};
